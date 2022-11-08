import { useCallback, useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useRouter } from 'next/dist/client/router';
import CustomHead from '@/components/CustomHead';
import { PROFILE, SCHEDULE } from '@/config/Routes';
import { IMentorship } from '@/interfaces/mentorship.interface';
import HistoryMentorshipCard from '@/components/HistoryMentorshipCard';
import { getAllMentorshipHistory, getUserData } from '@/services/index';
import WarnModal from '@/components/WarnModal';
import GenericCard from '@/components/GenericCard';
import Link from 'next/link';
import useUserContext from '@/hooks/useUserContext';
import { useNextAuthSession } from '@/hooks/useNextAuthSession';
import { signOut } from 'next-auth/react';

const History: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mentorships, setMentorships] = useState<IMentorship[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState({
    mentee_name: '',
    menteeId: '',
    mentorshipId: '',
  });
  const [session, loadingUser] = useNextAuthSession();
  const noMentorships = mentorships.length === 0;

  const { dispatch } = useUserContext();
  const router = useRouter();

  const getHistoryData = useCallback(() => {
    if (!loadingUser && session) {
      const id = session.user.id.toString();

      // Get user data and verify if the profile is configured,
      // if not, go to the profile settings
      // only admins could access without signup
      getUserData(id)
        .then(res => {
          !res.data.full_name && session.user.role !== '0'
            ? router.push(PROFILE)
            : dispatch({ type: 'SET', payload: { ...res.data } });
        })
        .catch(err => {
          signOut({ callbackUrl: '/' });
        });

      // Get user mentorships data
      getAllMentorshipHistory(id)
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
      <CustomHead title="Historial" />
      <DashboardLayout>
        <GenericCard
          isLoading={isLoading}
          isDataEmpty={noMentorships}
          noDataMessage={
            <span>
              Hasta el momento no has dado una mentoría, recuerda configurar tus{' '}
              <Link href={SCHEDULE} className="underline">
                horarios disponibles
              </Link>
              :)
            </span>
          }
        >
          {mentorships.map(mentorship => (
            <HistoryMentorshipCard
              key={mentorship.id}
              mentorship={mentorship}
              setModalData={setModalData}
              setModalIsOpen={setModalIsOpen}
            />
          ))}
        </GenericCard>
        <WarnModal
          open={modalIsOpen}
          setModal={setModalIsOpen}
          mentee_name={modalData.mentee_name}
          menteeId={modalData.menteeId}
          mentorshipId={modalData.mentorshipId}
          callback={getHistoryData}
        />
      </DashboardLayout>
    </>
  );
};

export default History;
