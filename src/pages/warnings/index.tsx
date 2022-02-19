import CustomHead from '@/components/CustomHead';
import DashboardLayout from '@/components/DashboardLayout';
import Spinner from '@/components/Spinner';
import WarningCard from '@/components/WarningCard';
import { HOME } from '@/config/Routes';
import { isAdmin } from '@/helpers/IsAdmin';
import { IWarning } from '@/interfaces/warning.interface';
import { getWarnings } from '@/services';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';

const Warnings = () => {
  const [warnings, setWarnings] = useState<IWarning[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => console.log(warnings), [warnings]);
  useEffect(() => {
    if (session && !loading) {
      isAdmin(session.user.role)
        ? getWarnings()
            .then(({ data }) => {
              setWarnings(data);
              setIsLoading(false);
            })
            .catch(err => console.log(err))
        : router.push(HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, router]);
  return (
    <>
      <CustomHead title="Blacklist" />
      <DashboardLayout title="Blacklist">
        <div className="pt-10 pb-5 rounded-lg bg-cardContent">
          {isLoading && <Spinner />}
          {!isLoading &&
            warnings.map(warn => <WarningCard key={warn.id} warning={warn} />)}
        </div>
      </DashboardLayout>
    </>
  );
};

export default Warnings;
