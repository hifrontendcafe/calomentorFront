import React, { useEffect, useState } from 'react';
import CustomHead from '@/components/CustomHead';
import DashboardLayout from '@/components/DashboardLayout';
import { HOME } from '@/config/Routes';
import { IUser } from '@/interfaces/user.interface';
import { useSession } from 'next-auth/client';
import { isAdmin } from '@/helpers/IsAdmin';
import { useRouter } from 'next/dist/client/router';
import MentorCard from '@/components/MentorCard/MentorCard';
import { getAllUsersData } from '@/services';
import GenericCard from '@/components/GenericCard';
import useToastContext from '@/hooks/useToastContext';

const AdminMentors = () => {
  const [mentors, setMentors] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [session, loading] = useSession();
  const router = useRouter();
  const emptyMentors = mentors.length === 0;
  const { addToast } = useToastContext();

  useEffect(() => {
    if (session && !loading) {
      isAdmin(session.user.role)
        ? getAllUsersData()
            .then(({ data }) => {
              setMentors(data);
              setIsLoading(false);
            })
            .catch(() => {
              addToast({
                title: 'Ha ocurrido un problema',
                subText: 'No se ha podido obtener la lista de warnings',
                type: 'error',
              });
              setIsLoading(false);
            })
        : router.push(HOME);
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
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </GenericCard>
      </DashboardLayout>
    </>
  );
};

export default AdminMentors;
