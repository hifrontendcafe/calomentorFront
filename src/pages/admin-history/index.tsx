import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useRouter } from 'next/dist/client/router';
import CustomHead from '@/components/CustomHead';
import { IMentorship } from '@/interfaces/mentorship.interface';
import {
  getAdminMentorshipHistory,
  getAdminMentorshipHistoryByName,
} from '@/services/index';
import useToastContext from '@/hooks/useToastContext';
import CustomButton from '@/components/CustomButton';
import { orderMentorshipsByDate } from '@/helpers/getOrderByDate';
import { useNextAuthSession } from '@/hooks/useNextAuthSession';
import Spinner from '@/components/Spinner';
import HistoryMentorshipCardFromBot from '@/components/HistoryMentorshipCardFromBot';

const AdminHistory: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mentorships, setMentorships] = useState<IMentorship[]>([]);
  const [session, loading] = useNextAuthSession();
  const router = useRouter();
  const { addToast } = useToastContext();
  const [name, setName] = useState<string>('');
  const [lastKey, setLastKey] = useState<{
    id: string;
  } | null>(null);

  const onSearchByName = async (baseName?: string) => {
    setIsLoading(true);
    const {
      data: { data },
    } = await getAdminMentorshipHistoryByName(baseName || name);
    setLastKey(null);
    setMentorships(orderMentorshipsByDate(data || []));
    setIsLoading(false);
  };

  const onSearchMore = async () => {
    setIsLoading(true);
    const {
      data: { data, lastKey: lastKeyResponse },
    } = await getAdminMentorshipHistory(lastKey?.id, '20');
    setLastKey(lastKeyResponse || null);
    setMentorships(orderMentorshipsByDate([...data, ...mentorships]));
    setIsLoading(false);
  };

  const getAllMentorships = () => {
    setIsLoading(true);
    getAdminMentorshipHistory()
      .then(({ data: { data, lastKey } }) => {
        setLastKey(lastKey || null);
        setMentorships(orderMentorshipsByDate(data || []));
        setIsLoading(false);
      })

      .catch(() => {
        addToast({
          title: 'Ha ocurrido un problema',
          subText:
            'No se ha podido obtener el historial completo de mentorías.',
          type: 'error',
        });
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (session && !loading) {
      getAllMentorships();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, router]);

  return (
    <>
      <CustomHead title="Historial Mentorías" />
      <DashboardLayout title="Historial Mentorías">
        <div className="flex flex-col h-16 gap-2 mt-4">
          <div className="flex w-1/2 gap-4">
            <input
              type="text"
              id="name"
              autoComplete="off"
              placeholder="Buscar por nombre de mentee o mentor"
              className="custom_input"
              value={name}
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
              bntLabel={'Todos'}
              primary
              clickAction={getAllMentorships}
              isActive={true}
            />
          </div>
        </div>

        {!isLoading && mentorships.length === 0 && (
          <div
            className={
              'border-green-500 mx-4 flex items-center justify-between my-5 border bg-cardContentLight rounded-md'
            }
          >
            <div className="flex-1 px-4 py-2 text-sm truncate">
              <p className="py-2 text-center text-mainTextColor">
                No hay mentorias registradas
              </p>
            </div>
          </div>
        )}
        {isLoading && <Spinner />}
        <div className="flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              {!isLoading && mentorships.length > 0 && (
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
                  <tbody className="border-b border-gray-700">
                    {mentorships?.map(mentorship => (
                      <HistoryMentorshipCardFromBot
                        key={mentorship.id}
                        mentorship={mentorship}
                      />
                    ))}
                  </tbody>
                </table>
              )}
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
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default AdminHistory;
