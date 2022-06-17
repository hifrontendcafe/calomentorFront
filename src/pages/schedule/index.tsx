import React, { useCallback, useEffect, useState } from 'react';
import CustomButton from '@/components/CustomButton';
import Timeslot from '@/components/Timeslot';
import { PlusIcon, XIcon } from '@heroicons/react/outline';
import { ITimeSlot } from '@/interfaces/timeslot.interface';
import AddTimeslot from '@/components/AddTimeslot/Index';
import CancelModal from '@/components/CancelModal';
import { getTimeslots } from '@/services';
import CustomHead from '@/components/CustomHead';
import DashboardLayout from '@/components/DashboardLayout';
import GenericCard from '@/components/GenericCard';
import { useNextAuthSession } from '@/hooks/useNextAuthSession';

const SettingsSchedulePage: React.FC = () => {
  const [session, loading] = useNextAuthSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timeslots, setTimeslots] = useState<ITimeSlot[]>([]);
  const [addNew, setAddNew] = useState(false);
  const [modalData, setModalData] = useState<{
    mentorship_token: string;
    mentee_name: string;
  }>({ mentorship_token: '', mentee_name: '' });
  const emptyTimeslots = timeslots.length === 0;

  const removeTimeslot = () => {
    setTimeslots(prev =>
      prev.filter(m => m.mentorship_token !== modalData.mentorship_token),
    );
  };

  const handleModalConfirmBtn = (
    mentorship_token: string,
    mentee_name: string,
  ) => {
    setModalData({
      mentorship_token,
      mentee_name,
    });
    setIsOpen(true);
  };

  const getSchedule = useCallback(() => {
    if (!loading && session) {
      getTimeslots(session.user.id.toString())
        .then(({ data }) => {
          setTimeslots(data);
          setIsLoading(false);
        })
        .catch(err => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (!loading && session) {
      getSchedule();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSchedule, loading]);

  return (
    <>
      <CustomHead title="Horarios" />
      <DashboardLayout
      >
        <GenericCard
          isLoading={isLoading}
          noDataMessage='No tienes ningún horario registrado, presiona en el botón
                      "Agregar" para añadir uno.'
          isDataEmpty={emptyTimeslots}
        >
          <AddTimeslot
            getSchedule={getSchedule}
            visible={addNew}
            close={() => setAddNew(false)}
            timeslots={timeslots}
          />
          {timeslots.map((timeslot: ITimeSlot) => (
            <Timeslot
              id={timeslot.id}
              key={timeslot.id}
              date={timeslot.date}
              timeslot_status={timeslot.timeslot_status}
              duration={timeslot.duration}
              updateTimeslots={setTimeslots}
              handleCancelTimeslot={() =>
                handleModalConfirmBtn(
                  timeslot.mentorship_token,
                  timeslot.mentee_username,
                )
              }
            />
          ))}
          <CancelModal
            open={isOpen}
            mentorship_token={modalData.mentorship_token}
            mentee_name={modalData.mentee_name}
            setModal={setIsOpen}
            callback={removeTimeslot}
          />
        </GenericCard>
      </DashboardLayout>
    </>
  );
};

export default SettingsSchedulePage;
