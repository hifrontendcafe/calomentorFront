import useToastContext from '@/hooks/useToastContext';
import { ITimeSlot, TIMESLOT_STATUS } from '@/interfaces/timeslot.interface';
import { CalendarIcon, TrashIcon, XIcon } from '@heroicons/react/outline';
import React, { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import Modal from '@/components/Modal';
import { formatDate } from '@/helpers/formatDate';
import classNames from 'classnames';
import { deleteTimeSlot } from '@/services/index';
import { deleteTimeSlotResponseSchema } from '@/schemas/schemas';
import { HiOutlineExclamation } from 'react-icons/hi';

interface ISlot {
  id: string;
  date: number;
  timeslot_status: TIMESLOT_STATUS;
  duration: 30 | 45 | 60;
  updateTimeslots: Dispatch<SetStateAction<ITimeSlot[]>>;
  handleCancelTimeslot: () => void;
}

const Timeslot: React.FC<ISlot> = ({
  id,
  date,
  timeslot_status,
  duration,
  updateTimeslots,
  handleCancelTimeslot,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { addToast } = useToastContext();
  const isTaken = timeslot_status === TIMESLOT_STATUS.OCCUPIED;
  const isFree = timeslot_status === TIMESLOT_STATUS.FREE;

  const handleDelete = async (timeslotId: string) => {
    let response: unknown;

    try {
      response = await deleteTimeSlot(timeslotId);
    } catch (err) {
      setModalIsOpen(false);
      addToast({
        title: 'Horario no eliminado',
        subText: 'Hubo un error al intentar eliminar el horario.',
        type: 'error',
      });
    }

    const safeResponse = deleteTimeSlotResponseSchema.safeParse(response);

    if (!safeResponse.success) {
      throw new Error(safeResponse.error.message);
    }

    setModalIsOpen(false);
    updateTimeslots(prevTimeslots =>
      prevTimeslots.filter(slot => slot.id !== id),
    );
    addToast({
      title: 'Horario eliminado',
      subText: 'El horario ha sido eliminado correctamente',
      type: 'default',
    });
  };

  return (
    <div className="flex flex-row m-5 rounded-md shadow-sm">
      <div
        className={classNames(
          'flex-shrink-0 flex items-center justify-center w-14 text-cardContentLight text-sm font-medium rounded-l-md',
          {
            'bg-red-400': isTaken,
            'bg-green-400': isFree,
          },
        )}
      >
        <CalendarIcon style={{ padding: 12 }} />
      </div>
      <div
        className={classNames(
          'flex items-center justify-between flex-1 truncate border-t border-b border-r bg-cardContentLight rounded-r-md',
          {
            'border-red-400': isTaken,
            'border-green-400': isFree,
          },
        )}
      >
        <div className="flex-1 px-4 py-2 text-sm truncate">
          <p className="font-semibold text-mainTextColor">
            {formatDate(date)} - Duración: {duration} minutos
          </p>
          <p className="text-mainTextColor">
            Estado: {isTaken ? 'agendada' : 'disponible'}
          </p>
        </div>
        <div className="flex-shrink-0 pr-2">
          <span className="relative z-0 inline-flex">
            {isTaken && (
              <button
                type="button"
                className="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium bg-transparent text-mainTextColor"
                onClick={handleCancelTimeslot}
              >
                <XIcon className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
            {isFree && (
              <button
                type="button"
                className="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium bg-transparent text-mainTextColor"
                onClick={() => setModalIsOpen(true)}
              >
                <TrashIcon className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </span>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onOpenChange={setModalIsOpen}
        confirmAction={() => handleDelete(id)}
        title="¿Seguro/a que quieres eliminar el horario?"
        danger
        Icon={HiOutlineExclamation}
        iconContainerClassName="bg-red-200"
        iconClassName="text-red-500"
      />
    </div>
  );
};

export default Timeslot;
