import CustomButton from '@/components/CustomButton';
import CustomHead from '@/components/CustomHead';
import DashboardLayout from '@/components/DashboardLayout';
import Spinner from '@/components/Spinner';
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
        {!isLoading && warnings.length === 0 && (
          <div
            className={
              'border-green-500 mx-4 flex items-center justify-between my-5 border bg-cardContentLight rounded-md'
            }
          >
            <div className="flex-1 px-4 py-2 text-sm truncate">
              <p className="py-2 text-center text-mainTextColor">
                No hay penalizaciones registradas
              </p>
            </div>
          </div>
        )}
        <div className="flex flex-col h-16 gap-2 px-6 -ml-6">
          <div className="flex gap-4 w-1/2">
            <input
              type="text"
              id="name"
              autoComplete="off"
              placeholder="Buscar por nombre de mentee o mentor"
              className="custom_input"
              onChange={({ target: { value } }) => setName(value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  onSearchByName();
                }
              }}
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
              bntLabel={'Últimas 20 penalizaciones'}
              primary
              clickAction={getAllWarnings}
              isActive={true}
            />
          </div>
        </div>
        {isLoading && <Spinner />}
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            {!isLoading && warnings.length > 0 && (
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-300 sm:pl-6 md:pl-0"
                    >
                      Fecha de la penalización
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-300"
                    >
                      Mentee
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-300"
                    >
                      Estado de la mentoria
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-300"
                    >
                      Autor
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0"
                    >
                      <span className="sr-only">Mas info</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="border-b border-gray-700">
                  {warnings.map(warn => (
                    <WarningCardFromBot
                      key={warn.id}
                      warning={warn}
                      setWarnings={(id: string) =>
                        setWarnings(warnings.filter(warn => warn.id !== id))
                      }
                      setLoading={setIsLoading}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
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
      </DashboardLayout>
    </>
  );
};

export default Warnings;
