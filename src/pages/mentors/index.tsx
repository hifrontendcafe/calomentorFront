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
import { Listbox } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import classNames from 'classnames';

interface FilterButtonsInterface {
  label: string;
  filterName: UserStatus | 'all';
}

const filterButtons: FilterButtonsInterface[] = [
  { label: 'Todos', filterName: 'all' },
  { label: 'Activos', filterName: UserStatus.ACTIVE },
  { label: 'Inactivos', filterName: UserStatus.INACTIVE },
  { label: 'Fuera del programa', filterName: UserStatus.OUT },
  { label: 'No disponibles', filterName: UserStatus.NOT_AVAILABLE },
];

const Mentors = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterButtonsInterface>(
    filterButtons[0],
  );
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

  const onFilterChange = (filter: FilterButtonsInterface) => {
    const filterMentors = (status: UserStatus) => {
      setFilteredMentors(mentors.filter(mentor => mentor.status === status));
    };
    setActiveFilter(filter);

    if (filter.filterName === 'all') {
      setFilteredMentors(mentors);
    } else if (filter.filterName === UserStatus.ACTIVE) {
      filterMentors(UserStatus.ACTIVE);
    } else if (filter.filterName === UserStatus.INACTIVE) {
      filterMentors(UserStatus.INACTIVE);
    } else if (filter.filterName === UserStatus.OUT) {
      filterMentors(UserStatus.OUT);
    } else {
      filterMentors(UserStatus.NOT_AVAILABLE);
    }
  };

  return (
    <>
      <CustomHead title="Mentors" />
      <DashboardLayout>
        <GenericCard
          isLoading={isLoading}
          isDataEmpty={emptyMentors}
          noDataMessage="Aún no se han registrado mentors"
          bodyClassnames="w-full"
        >
          {!emptyMentors && (
            <div className="flex flex-col items-center md:items-end px-4 mb-4 min-h-fit gap-2">
              <Listbox
                value={activeFilter}
                onChange={value => onFilterChange(value)}
              >
                <Listbox.Button className="w-[90%] md:w-[35%] lg:w-[25%] h-8 bg-cardContent border border-fecGreen rounded-md text-fecGreen flex flex-row justify-center items-center">
                  <div className="flex-1">{activeFilter.label}</div>
                  <ChevronDownIcon className="w-4 mr-2" />
                </Listbox.Button>
                <Listbox.Options className="w-[90%] md:w-[35%] lg:w-[25%]">
                  {filterButtons.map(filter => (
                    <Listbox.Option key={filter.filterName} value={filter}>
                      {({ active, selected }) => (
                        <li
                          className={classNames(
                            'w-full my-1 border border-fecGreen rounded-md h-8 flex items-center justify-center',
                            {
                              'bg-fecGreen text-white': active ?? selected,
                              'bg-cardContent text-fecGreen':
                                !active ?? selected,
                            },
                          )}
                        >
                          {filter.label}
                        </li>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>
          )}
          {filteredMentors.map(mentor => (
            <MentorCardSanity key={mentor._id} mentor={mentor} />
          ))}
        </GenericCard>
      </DashboardLayout>
    </>
  );
};

export default Mentors;
