import { useCallback, useContext, useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/client';
import DashboardLayout from '@/components/DashboardLayout';
import { useRouter } from 'next/dist/client/router';
import { UserContext } from '@/context/UserContext';
import CustomHead from '@/components/CustomHead';
import { PROFILE } from '@/config/Routes';
import { IMentorhip } from '@/interfaces/mentorship.interface';
import HistoryMentorshipCard from '@/components/HistoryMentorshipCard';
import Spinner from '@/components/Spinner';
import { getAllMentorshipHistory, getUserData } from '@/services/index';
import WarnModal from '@/components/WarnModal';

const History: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mentorships, setMentorships] = useState<IMentorhip[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState({
    menteeName: '',
    menteeId: '',
    mentorshipId: '',
  });
  const [session, loadingUser] = useSession();

  const { dispatch } = useContext(UserContext);
  const router = useRouter();

  const getHistoryData = useCallback(() => {
    if (!loadingUser && session) {
      const userID = session.user.id.toString();

      // Get user data and verify if the profile is configured,
      // if not, go to the profile settings
      // only admins could access without signup
      getUserData(userID)
        .then(res => {
          !res.data.full_name && session.user.role !== '0'
            ? router.push(PROFILE)
            : dispatch({ type: 'SET', payload: { ...res.data } });
        })
        .catch(err => {
          signOut({ callbackUrl: '/' });
        });

      // Get user mentorships data
      getAllMentorshipHistory(userID)
        .then(({ data }) => {
          setIsLoading(false);
          setMentorships(data);
        })
        .catch(() => {
          signOut({ callbackUrl: '/' });
        });
    }
  }, [dispatch, loadingUser, router, session]);

  useEffect(() => {
    getHistoryData();
  }, [getHistoryData]);

  return (
    <>
      <CustomHead title="Historial de mentorías" />
      <DashboardLayout title="Historial">
        <div className="pt-10 pb-5 rounded-lg bg-cardContent">
          {isLoading && <Spinner />}
          {!isLoading && mentorships.length === 0 && (
            <div
              className={
                'border-green-500 mx-6 flex items-center justify-between my-5 border bg-cardContentLight rounded-md'
              }
            >
              <div className="flex-1 px-4 py-2 text-sm truncate">
                <p className="py-2 text-center text-mainTextColor">
                  No existen mentorías pasadas
                </p>
              </div>
            </div>
          )}
          {!isLoading &&
            mentorships.map(mentorship => (
              <HistoryMentorshipCard
                key={mentorship.id}
                mentorship={mentorship}
                setModalData={setModalData}
                setModalIsOpen={setModalIsOpen}
              />
            ))}
        </div>
        <WarnModal
          open={modalIsOpen}
          setModal={setModalIsOpen}
          menteeName={modalData.menteeName}
          menteeId={modalData.menteeId}
          mentorshipId={modalData.mentorshipId}
          callback={getHistoryData}
        />
      </DashboardLayout>
    </>
  );
};

export default History;
