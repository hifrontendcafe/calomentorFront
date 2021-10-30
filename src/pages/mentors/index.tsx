import React, { useEffect, useState } from 'react';
import CustomHead from '@/components/CustomHead';
import DashboardLayout from '@/components/DashboardLayout';
import { axiosGet } from '@/lib/api';
import { HOME, USER } from '@/config/Routes';
import { IUser } from '@/interfaces/user.interface';
import { useSession } from 'next-auth/client';
import { isAdmin } from '@/helpers/IsAdmin';
import { useRouter } from 'next/dist/client/router';
import MentorCard from '@/components/MentorCard/MentorCard';

interface Props {}

const AdminMentors = () => {
  const [mentors, setMentors] = useState<IUser[]>([]);
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && !loading) {
      const getUserData = async () => await axiosGet(USER);
      isAdmin(session.user.role)
        ? getUserData()
            .then(({ data }) => {
              setMentors(data);
            })
            .catch(err => console.log(err))
        : router.push(HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, router]);

  return (
    <>
      <CustomHead title="Mentores" />
      <DashboardLayout title="Mentores">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {mentors.map(mentor => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </DashboardLayout>
    </>
  );
};

export default AdminMentors;
