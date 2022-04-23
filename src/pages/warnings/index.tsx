import CustomButton from '@/components/CustomButton';
import CustomHead from '@/components/CustomHead';
import DashboardLayout from '@/components/DashboardLayout';
import GenericCard from '@/components/GenericCard';
import WarningCardFromBot from '@/components/WarningCardFromBot';
import { orderWarningsByDate } from '@/helpers/getOrderByDate';
import { IWarning } from '@/interfaces/warning.interface';
import { getWarnings } from '@/services';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';

export type WarningModalData = {
  warning_id: string;
  mentee_name: string;
};

const Warnings = () => {
  const [warnings, setWarnings] = useState<IWarning[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [session, loading] = useSession();
  const router = useRouter();
  const emptyWarnings = warnings.length === 0;

  const [name, setName] = useState<string>('');

  const onSearchByName = async () => {
    setIsLoading(true);
    const { data } = await getWarnings(name);
    setWarnings(orderWarningsByDate(data));
    setIsLoading(false);
  };

  useEffect(() => {
    if (session && !loading) {
      getWarnings()
        .then(({ data }) => {
          setWarnings(orderWarningsByDate(data));
          setIsLoading(false);
        })
        .catch(err => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, router]);

  return (
    <>
      <CustomHead title="Blacklist" />
      <DashboardLayout title="Blacklist">
        <GenericCard
          isLoading={isLoading}
          isDataEmpty={emptyWarnings}
          noDataMessage="Actualmente no hay usuarios con advertencias 🥳"
        >
                    <div className="flex flex-col px-6 h-16 gap-2">
            <div className="flex gap-4 w-80">
              <input
                type="text"
                id="name"
                autoComplete="off"
                placeholder="Buscar por nombre"
                className="custom_input"
                onChange={({ target: { value } }) => setName(value)}
              />
              <CustomButton
                className="mt-1"
                bntLabel={'Buscar'}
                primary
                clickAction={onSearchByName}
                isActive={true}
              />
            </div>
          </div>
          {warnings.map(warn => (
            <WarningCardFromBot
              key={warn.id}
              warning={warn}
            />
          ))}
        </GenericCard>
      </DashboardLayout>
    </>
  );
};

export default Warnings;
