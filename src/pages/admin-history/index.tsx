import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';
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

const AdminHistory: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mentorships, setMentorships] = useState<IMentorship[]>([]);
  const [session, loading] = useSession();
  const noMentorships = mentorships.length === 0;
  const router = useRouter();
  const { addToast } = useToastContext();
  const [name, setName] = useState<string>('');

  const onSearchByName = async () => {
    setIsLoading(true);
    const { data } = await getAdminMentorshipHistoryByName(name);
    setMentorships(orderMentorshipsByDate(data));
    setIsLoading(false);
  };

  useEffect(() => {
    if (session && !loading) {
      getAdminMentorshipHistory()
        .then(({ data }) => {
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
          {mentorships.map(mentorship => (
            <HistoryMentorshipCardFromBot
              key={mentorship.id}
              mentorship={mentorship}
            />
          ))}
        </GenericCard>
      </DashboardLayout>
    </>
  );
};

export default AdminHistory;
