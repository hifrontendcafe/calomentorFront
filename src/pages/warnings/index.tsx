import CustomButton from '@/components/CustomButton';
import CustomHead from '@/components/CustomHead';
import DashboardLayout from '@/components/DashboardLayout';
import GenericCard from '@/components/GenericCard';
import WarningCardFromBot from '@/components/WarningCardFromBot';
import { orderWarningsByDate } from '@/helpers/getOrderByDate';
import { useNextAuthSession } from '@/hooks/useNextAuthSession';
import { IWarning } from '@/interfaces/warning.interface';
import { getWarnings } from '@/services';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';

export type WarningModalData = {
  warning_id: string;
  mentee_name: string;
};

const Warnings = () => {
  const [warnings, setWarnings] = useState<IWarning[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [session, loading] = useNextAuthSession();
  const router = useRouter();
  const emptyWarnings = warnings.length === 0;

  const [name, setName] = useState<string>('');
  const [lastKey, setLastKey] = useState<{
    id: string;
  } | null>(null);

  const onSearchByName = async () => {
    setIsLoading(true);
    const { data } = await getWarnings(name);
    setLastKey(null);
    setWarnings(orderWarningsByDate(data));
    setIsLoading(false);
  };

  const onSearchMore = async () => {
    setIsLoading(true);
    const { data, lastKey: lastKeyResponse } = await getWarnings(
      null,
      lastKey?.id,
      '20',
    );
    setLastKey(lastKeyResponse || null);
    setWarnings(orderWarningsByDate([...data, ...warnings]));
    setIsLoading(false);
  };

  const getAllWarnings = () => {
    setIsLoading(true);
    getWarnings()
      .then(({ data, lastKey }) => {
        if (lastKey) {
          setLastKey(lastKey);
        }
        setWarnings(orderWarningsByDate(data));
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (session && !loading) {
      getAllWarnings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, router]);

  return (
    <>
      <CustomHead title="Penalizaciones" />
      <DashboardLayout title="Penalizaciones">
        <GenericCard
          isLoading={isLoading}
          isDataEmpty={emptyWarnings}
          noDataMessage="Actualmente no hay usuarios con penalizaciones 🥳"
        >
          <div className="flex flex-col h-16 gap-2 px-6">
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
              <CustomButton
                className="mt-1"
                bntLabel={'Todos'}
                primary
                clickAction={getAllWarnings}
                isActive={true}
              />
            </div>
          </div>
          {warnings.map(warn => (
            <WarningCardFromBot key={warn.id} warning={warn} />
          ))}
          {lastKey && (
            <div className="flex justify-center w-full">
              <CustomButton
                className="flex justify-center w-48 mt-1"
                bntLabel={'Buscar más'}
                primary
                clickAction={onSearchMore}
                isActive={true}
              />
            </div>
          )}
        </GenericCard>
      </DashboardLayout>
    </>
  );
};

export default Warnings;
