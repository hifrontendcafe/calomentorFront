import React, { useEffect, useState } from 'react';
import CustomHead from '@/components/CustomHead';
import DashboardLayout from '@/components/DashboardLayout';
import GenericCard from '@/components/GenericCard';
import { useRouter } from 'next/dist/client/router';
import { IMentorship } from '@/interfaces/mentorship.interface';
import { IWarning } from '@/interfaces/warning.interface';
import { getWarningsById, getMentorshipsById } from '@/services';
import WarningCardFromBot from '@/components/WarningCardFromBot';
import HistoryMentorshipCardFromBot from '@/components/HistoryMentorshipCardFromBot';
import Spinner from '@/components/Spinner';

const SelfHistory = () => {
  const [mentorships, setMentorships] = useState<IMentorship[]>([]);
  const [warnings, setWarnings] = useState<IWarning[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    query: { name, userId, isMentor },
  } = useRouter();

  useEffect(() => {
    setWarnings([]);
    setMentorships([]);
    setIsLoading(true);
    if (userId) {
      getMentorshipsById(String(userId))
        .then(({ data: { data } }) => {
          setMentorships(data);
          getWarningsById(String(userId))
            .then(({ data: { warnings_data } }) => {
              setWarnings(warnings_data);
              setIsLoading(false);
            })
            .catch(() => {
              setIsLoading(false);
            });
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <>
      <CustomHead title={String(name)} />
      <DashboardLayout
        subtitle={
          isLoading || !mentorships
            ? undefined
            : `${`${mentorships?.length} Mentoría${
                mentorships?.length === 1 ? '' : 's'
              } ${
                isMentor
                  ? ''
                  : `|  ${warnings?.length} Penalizaci${
                      warnings?.length === 1 ? 'ón' : 'ones'
                    }`
              }`}`
        }
      >
        {isLoading && <Spinner />}
        {!isLoading && (
          <GenericCard
            isLoading={isLoading}
            isDataEmpty={!mentorships || mentorships?.length === 0}
            noDataMessage={`Aún no se han registrado mentorias de ${name}`}
          >
            {mentorships?.length > 0 && (
              <h2 className="text-base font-medium leading-6 text-mainTextColor">
                Mentorias de {name}
              </h2>
            )}
            {!isLoading && mentorships?.length > 0 && (
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-300 sm:pl-6 md:pl-0 "
                    >
                      Fecha de carga
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-300"
                    >
                      Mentor
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-300"
                    >
                      Mentee
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0"
                    >
                      <span className="sr-only">Mas info</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="border-b border-gray-700 no-scrollbar">
                  {mentorships?.map(mentorship => (
                    <HistoryMentorshipCardFromBot
                      key={mentorship.id}
                      mentorship={mentorship}
                      setMentorships={(id: string) =>
                        setMentorships(
                          mentorships.filter(
                            mentorship => mentorship.id !== id,
                          ),
                        )
                      }
                      setLoading={setIsLoading}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </GenericCard>
        )}
        {!isLoading && warnings && !isMentor && (
          <div className="mt-5">
            <GenericCard
              isLoading={isLoading}
              isDataEmpty={warnings.length === 0}
              noDataMessage={`Aún no se han registrado penalizaciones para ${name}`}
            >
              {warnings.length > 0 && (
                <h2 className="text-base font-medium leading-6 text-mainTextColor">
                  Penalizaciones de {name}
                </h2>
              )}
              {!isLoading && warnings.length > 0 && (
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-300 sm:pl-6 md:pl-0 "
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
            </GenericCard>
          </div>
        )}
      </DashboardLayout>
    </>
  );
};

export default SelfHistory;
