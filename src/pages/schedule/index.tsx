import React, { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';
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

const SettingsSchedulePage: React.FC = () => {
  const [session, loading] = useSession();
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
        title="Horarios"
        endEnhancer={
          <CustomButton
            bntIcon={
              !addNew ? (
                <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              ) : (
                <XIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              )
            }
            bntLabel={addNew ? 'Cancelar' : 'Agregar'}
            primary
            clickAction={() => setAddNew(!addNew)}
          />
        }
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
              is_occupied={timeslot.is_occupied}
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
