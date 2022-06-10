import React, { useEffect, useState } from 'react';
import CustomHead from '@/components/CustomHead';
import DashboardLayout from '@/components/DashboardLayout';
import { Mentor, UserStatus } from '@/interfaces/user.interface';
import { useRouter } from 'next/dist/client/router';
import MentorCardSanity from '@/components/MentorCardSanity/MentorCardSanity';
import { getAllMentors } from '@/services';
import GenericCard from '@/components/GenericCard';
import useToastContext from '@/hooks/useToastContext';
import { useNextAuthSession } from '@/hooks/useNextAuthSession';
import CustomButton from '@/components/CustomButton';

const Mentors = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<UserStatus | 'all'>('all');
  const [session, loading] = useNextAuthSession();
  const router = useRouter();
  const emptyMentors = mentors.length === 0;
  const { addToast } = useToastContext();

  useEffect(() => {
    if (session && !loading) {
      getAllMentors()
        .then(({ data }) => {
          const mentorsSorted = data.sort(mentor => {
            if (
              mentor.status &&
              [UserStatus.ACTIVE, UserStatus.NOT_AVAILABLE].includes(
                mentor.status,
              )
            ) {
              return -1;
            }
            return 1;
          });
          setMentors(mentorsSorted);
          setFilteredMentors(mentorsSorted);
          setIsLoading(false);
        })
        .catch(() => {
          addToast({
            title: 'Ha ocurrido un problema',
            subText: 'No se ha podido obtener la lista de mentors',
            type: 'error',
          });
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, router]);

  const onFilterChange = (filter: UserStatus | 'all') => {
    const filterMentors = (status: UserStatus) => {
      setFilteredMentors(mentors.filter(mentor => mentor.status === status));
    };
    setActiveFilter(filter);

    if (filter === 'all') {
      setFilteredMentors(mentors);
    } else if (filter === UserStatus.ACTIVE) {
      filterMentors(UserStatus.ACTIVE);
    } else if (filter === UserStatus.INACTIVE) {
      filterMentors(UserStatus.INACTIVE);
    } else if (filter === UserStatus.OUT) {
      filterMentors(UserStatus.OUT);
    } else {
      filterMentors(UserStatus.NOT_AVAILABLE);
    }
  };

  const getActiveButton = (status: UserStatus | 'all') => {
    if (status === activeFilter) {
      return true;
    }
    return false;
  };

  const filterButtons = [
    { label: 'Todos', filterName: 'all' },
    { label: 'Activos', filterName: UserStatus.ACTIVE },
    { label: 'Inactivos', filterName: UserStatus.INACTIVE },
    { label: 'Fuera del programa', filterName: UserStatus.OUT },
    { label: 'No disponibles', filterName: UserStatus.NOT_AVAILABLE },
  ];

  return (
    <>
      <CustomHead title="Mentors" />
      <DashboardLayout title="Mentors">
        <GenericCard
          isLoading={isLoading}
          isDataEmpty={emptyMentors}
          noDataMessage="Aún no se han registrado mentors"
        >
          <div className="flex px-4 mb-4 h-8 gap-2">
            {filterButtons.map(button => (
              <CustomButton
                key={button.label}
                bntLabel={button.label}
                primary
                clickAction={() =>
                  onFilterChange(button.filterName as UserStatus | 'all')
                }
                isActive={getActiveButton(
                  button.filterName as UserStatus | 'all',
                )}
              />
            ))}
          </div>
          {filteredMentors.map(mentor => (
            <MentorCardSanity key={mentor._id} mentor={mentor} />
          ))}
        </GenericCard>
      </DashboardLayout>
    </>
  );
};

export default Mentors;
