import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useRouter } from 'next/dist/client/router';
import CustomHead from '@/components/CustomHead';
import { IMentorship } from '@/interfaces/mentorship.interface';
import HistoryMentorshipCardFromBot from '@/components/HistoryMentorshipCardFromBot';
import {
  getAdminMentorshipHistory,
  getAdminMentorshipHistoryByName,
} from '@/services/index';
import GenericCard from '@/components/GenericCard';
import useToastContext from '@/hooks/useToastContext';
import CustomButton from '@/components/CustomButton';
import { orderMentorshipsByDate } from '@/helpers/getOrderByDate';
import { useNextAuthSession } from '@/hooks/useNextAuthSession';
import { formatDate } from '@/helpers/formatDate';

const AdminHistory: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mentorships, setMentorships] = useState<IMentorship[]>([]);
  const [session, loading] = useNextAuthSession();
  const noMentorships = mentorships?.length === 0;
  const router = useRouter();
  const { addToast } = useToastContext();
  const [name, setName] = useState<string>('');
  const [lastKey, setLastKey] = useState<{
    id: string;
  } | null>(null);

  const onSearchByName = async () => {
    setIsLoading(true);
    const {
      data: { data },
    } = await getAdminMentorshipHistoryByName(name);
    setLastKey(null);
    setMentorships(orderMentorshipsByDate(data));
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
        setMentorships(orderMentorshipsByDate(data));
        setIsLoading(false);
        console.log('mentor', data);
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
        <div className="flex flex-col mt-8">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
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
                    <tr
                      className="border-b border-gray-700"
                      key={mentorship.id}
                    >
                      <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-300 whitespace-nowrap sm:pl-6 md:pl-0">
                        {mentorship.mentorship_create_date}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-300 whitespace-nowrap">
                        <div className="font-bold hover:text-teal-500">
                          {mentorship.mentor_name}
                        </div>
                        <div className="text-gray-400">
                          ID {mentorship.mentor_id}
                        </div>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-300 whitespace-nowrap">
                        <div className="font-bold hover:text-teal-500">
                          {mentorship.mentee_name}
                        </div>
                        <div className="text-gray-400">
                          ID {mentorship.mentee_id}
                        </div>
                      </td>
                      <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6 md:pr-0">
                        <a
                          href="#"
                          className="text-mainTextColor hover:text-teal-600"
                        >
                          Remover registro
                          <span className="sr-only"></span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default AdminHistory;
