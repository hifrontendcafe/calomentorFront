import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useRouter } from 'next/dist/client/router';
import CustomHead from '@/components/CustomHead';
import { PROFILE, SCHEDULE } from '@/config/Routes';
import CancelModal from '@/components/CancelModal';
import { IMentorship } from '@/interfaces/mentorship.interface';
import MentorshipCard from '@/components/MentorshipCard';
import Link from 'next/link';
import { getUserData, getFutureMentorships } from '@/services';
import GenericCard from '@/components/GenericCard';
import useUserContext from '@/hooks/useUserContext';
import { useNextAuthSession } from '@/hooks/useNextAuthSession';
import { signOut } from 'next-auth/react';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mentorships, setMentorships] = useState<IMentorship[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    mentorship_token: string;
    mentee_name: string;
  }>({ mentorship_token: '', mentee_name: '' });

  const [session, loading] = useNextAuthSession();
  const { dispatch } = useUserContext();
  const router = useRouter();
  const mentorshipsEmpty = mentorships.length === 0;
  const removeMentorship = () => {
    setMentorships(prev =>
      prev.filter(m => m.mentorship_token !== modalData.mentorship_token),
    );
  };

  const handleModalConfirmBtn = (
    mentorship_token: string,
    mentee_name: string,
  ) => {
    setModalData({
      mentorship_token,
      mentee_name,
    });
    setIsOpen(true);
  };

  useEffect(() => {
    if (!loading && session) {
      const id = session.user.id.toString();

      // Get user data and verify if the profile is configured,
      // if not, go to the profile settings
      getUserData(id)
        .then(({ data }) => {
          !data.full_name && session.user.role !== '0'
            ? router.push(PROFILE)
            : dispatch({ type: 'SET', payload: { ...data } });
        })
        .catch(() => {
          signOut({ callbackUrl: '/' });
        });

      // Get user mentorships data
      getFutureMentorships(id)
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
                  m.mentorship_token,
                  m.mentee_username_discord,
                )
              }
            />
          ))}
        </GenericCard>
        <CancelModal
          open={isOpen}
          mentorship_token={modalData.mentorship_token}
          mentee_name={modalData.mentee_name}
          setModal={setIsOpen}
          callback={removeMentorship}
        />
      </DashboardLayout>
    </>
  );
};

export default Home;
