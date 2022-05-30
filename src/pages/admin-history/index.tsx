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
        <GenericCard
          isLoading={isLoading}
          isDataEmpty={noMentorships}
          noDataMessage="No hay mentorías registradas"
        >
          <div className="flex flex-col h-16 gap-2 px-6">
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
                bntLabel={'Todos'}
                primary
                clickAction={getAllMentorships}
                isActive={true}
              />
            </div>
          </div>
          {mentorships?.map(mentorship => (
            <HistoryMentorshipCardFromBot
              key={mentorship.id}
              mentorship={mentorship}
            />
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

export default AdminHistory;
