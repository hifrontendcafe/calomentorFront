import { useContext, useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/client';
import DashboardLayout from '@/components/DashboardLayout';
import { useRouter } from 'next/dist/client/router';
import { UserContext } from '@/context/UserContext';
import CustomHead from '@/components/CustomHead';
import { PROFILE, SCHEDULE } from '@/config/Routes';
import CancelModal from '@/components/CancelModal';
import { IMentorhip } from '@/interfaces/mentorship.interface';
import MentorshipCard from '@/components/MentorshipCard';
import Link from 'next/link';
import Spinner from '@/components/Spinner';
import { getUserData, getFutureMentorships } from '@/services';
import GenericCard from '@/components/GenericCard';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mentorships, setMentorships] = useState<IMentorhip[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    mentorshipToken: string;
    menteeName: string;
  }>({ mentorshipToken: '', menteeName: '' });

  const [session, loading] = useSession();
  const { dispatch } = useContext(UserContext);
  const router = useRouter();
  const mentorshipsEmpty = mentorships.length === 0;
  const removeMentorship = () => {
    setMentorships(prev =>
      prev.filter(m => m.tokenForCancel !== modalData.mentorshipToken),
    );
  };

  const handleModalConfirmBtn = (token: string, name: string) => {
    setModalData({
      mentorshipToken: token,
      menteeName: name,
    });
    setIsOpen(true);
  };

  useEffect(() => {
    if (!loading && session) {
      const userID = session.user.id.toString();

      // Get user data and verify if the profile is configured,
      // if not, go to the profile settings
      getUserData(userID)
        .then(({ data }) => {
          !data.full_name && session.user.role !== '0'
            ? router.push(PROFILE)
            : dispatch({ type: 'SET', payload: { ...data } });
        })
        .catch(() => {
          signOut({ callbackUrl: '/' });
        });

      // Get user mentorships data
      getFutureMentorships(userID)
        .then(({ data }) => {
          setIsLoading(false);
          setMentorships(data);
        })
        .catch(() => {
          signOut({ callbackUrl: '/' });
        });
    }
  }, [loading, session, router, dispatch]);

  return (
    <>
      <CustomHead title="Inicio" />
      <DashboardLayout title="Inicio">
        <GenericCard
          title="Próximas Mentorías"
          isDataEmpty={mentorshipsEmpty}
          isLoading={isLoading}
          noDataMessage={
            <span>
              Actualmente no posees mentorías agendadas, recuerda configurar tus{' '}
              <Link href={SCHEDULE}>
                <a className="underline">horarios disponibles.</a>
              </Link>
            </span>
          }
        >
          {mentorships.map(m => (
            <MentorshipCard
              key={m.id}
              mentorship={m}
              handleCancelMentorship={() =>
                handleModalConfirmBtn(
                  m.tokenForCancel,
                  m.mentee_username_discord,
                )
              }
            />
          ))}
        </GenericCard>
        <CancelModal
          open={isOpen}
          mentorshipToken={modalData.mentorshipToken}
          menteeName={modalData.menteeName}
          setModal={setIsOpen}
          callback={removeMentorship}
        />
      </DashboardLayout>
    </>
  );
};

export default Home;
