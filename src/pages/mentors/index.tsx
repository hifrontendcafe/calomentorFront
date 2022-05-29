import React, { useEffect, useState } from 'react';
import CustomHead from '@/components/CustomHead';
import DashboardLayout from '@/components/DashboardLayout';
import { Mentor, UserStatus } from '@/interfaces/user.interface';
import { useRouter } from 'next/dist/client/router';
import MentorCardSanity from '@/components/MentorCardSanity/MentorCardSanity';
import { getAllMentors } from '@/services';
import GenericCard from '@/components/GenericCard';
import useToastContext from '@/hooks/useToastContext';
import { useNextAuthSession } from '@/hooks/useNextAuthSession';

const Mentors = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [session, loading] = useNextAuthSession();
  const router = useRouter();
  const emptyMentors = mentors.length === 0;
  const { addToast } = useToastContext();

  useEffect(() => {
    if (session && !loading) {
      getAllMentors()
        .then(({ data }) => {
          const mentorsSorted = data.sort(mentor => {
            if (
              mentor.status &&
              [UserStatus.ACTIVE, UserStatus.NOT_AVAILABLE].includes(
                mentor.status,
              )
            ) {
              return -1;
            }
            return 1;
          });
          setMentors(mentorsSorted);
          setIsLoading(false);
        })
        .catch(() => {
          addToast({
            title: 'Ha ocurrido un problema',
            subText: 'No se ha podido obtener la lista de warnings',
            type: 'error',
          });
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, router]);

  return (
    <>
      <CustomHead title="Mentores" />
      <DashboardLayout title="Mentores">
        <GenericCard
          isLoading={isLoading}
          isDataEmpty={emptyMentors}
          noDataMessage="Aún no se han registrado mentores"
        >
          {mentors.map(mentor => (
            <MentorCardSanity key={mentor._id} mentor={mentor} />
          ))}
        </GenericCard>
      </DashboardLayout>
    </>
  );
};

export default Mentors;
