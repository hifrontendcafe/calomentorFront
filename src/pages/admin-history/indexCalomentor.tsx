import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useRouter } from 'next/dist/client/router';
import CustomHead from '@/components/CustomHead';
import { HOME } from '@/config/Routes';
import { IMentorship, STATUS } from '@/interfaces/mentorship.interface';
import HistoryMentorshipCard from '@/components/HistoryMentorshipCard';
import { getAdminMentorshipHistory } from '@/services/index';
import WarnModal from '@/components/WarnModal';
import GenericCard from '@/components/GenericCard';
import { isAdmin } from '@/helpers/hasRole';
import useToastContext from '@/hooks/useToastContext';
import CustomButton from '@/components/CustomButton';
import { useNextAuthSession } from '@/hooks/useNextAuthSession';

interface ModalData {
  mentee_name: string;
  menteeId: string;
  mentorshipId: string;
}
const AdminHistory: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mentorships, setMentorships] = useState<IMentorship[]>([]);
  const [filteredMentorships, setFilteredMentorships] = useState<IMentorship[]>(
    [],
  );
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData>({
    mentee_name: '',
    menteeId: '',
    mentorshipId: '',
  });
  const [activeFilter, setActiveFilter] = useState<STATUS | 'all'>('all');
  const [session, loading] = useNextAuthSession();
  const noMentorships = mentorships.length === 0;
  const router = useRouter();
  const { addToast } = useToastContext();

  const onFilterChange = (filter: STATUS | 'all') => {
    const filterMentorships = (status: STATUS) => {
      setFilteredMentorships(
        mentorships.filter(
          mentorship => mentorship.mentorship_status === status,
        ),
      );
    };
    setActiveFilter(filter);
    if (filter === 'all') {
      setFilteredMentorships(mentorships);
    } else if (filter === STATUS.ACTIVE) {
      filterMentorships(STATUS.ACTIVE);
    } else if (filter === STATUS.CANCEL) {
      filterMentorships(STATUS.CANCEL);
    } else if (filter === STATUS.CONFIRMED) {
      filterMentorships(STATUS.CONFIRMED);
    } else {
      filterMentorships(STATUS.WITHWARNING);
    }
  };

  const getActiveButton = (status: STATUS | 'all') => {
    if (status === activeFilter) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (session && !loading) {
      isAdmin(session.user.role)
        ? getAdminMentorshipHistory()
            .then(({ data: { data } }) => {
              setMentorships(data);
              setFilteredMentorships(data);
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
            })
        : router.push(HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, router]);

  const filterButtons = [
    { label: 'Todas', filterName: 'all' },
    { label: 'Activas', filterName: STATUS.ACTIVE },
    { label: 'Confirmadas', filterName: STATUS.CONFIRMED },
    { label: 'Canceladas', filterName: STATUS.CANCEL },
    { label: 'Con advertencia', filterName: STATUS.WITHWARNING },
  ];

  return (
    <>
      <CustomHead title="Historial Mentorías" />
      <DashboardLayout>
        <GenericCard
          isLoading={isLoading}
          isDataEmpty={noMentorships}
          noDataMessage="No hay mentorías registradas"
        >
          {!noMentorships && (
            <div className="flex px-4 h-8 gap-2">
              {filterButtons.map(button => (
                <CustomButton
                  key={button.label}
                  bntLabel={button.label}
                  primary
                  clickAction={() =>
                    onFilterChange(button.filterName as STATUS | 'all')
                  }
                  isActive={getActiveButton(
                    button.filterName as STATUS | 'all',
                  )}
                />
              ))}
            </div>
          )}
          {filteredMentorships.map(mentorship => (
            <HistoryMentorshipCard
              key={mentorship.id}
              mentorship={mentorship}
              setModalData={setModalData}
              setModalIsOpen={setModalIsOpen}
              isAdmin
            />
          ))}
        </GenericCard>
        <WarnModal
          open={modalIsOpen}
          setModal={setModalIsOpen}
          mentee_name={modalData.mentee_name}
          menteeId={modalData.menteeId}
          mentorshipId={modalData.mentorshipId}
          // callback={getHistoryData}
        />
      </DashboardLayout>
    </>
  );
};

export default AdminHistory;
