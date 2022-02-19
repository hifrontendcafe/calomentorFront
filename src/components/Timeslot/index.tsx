import { TIMESLOTS } from '@/config/Routes';
import useToastContext from '@/hooks/useToastContext';
import { ITimeslot } from '@/interfaces/timeslot.interface';
import { axiosDelete } from '@/lib/api';
import { CalendarIcon, TrashIcon, XIcon } from '@heroicons/react/outline';
import React, { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import Modal from '../Modal';
import { formatDate } from '@/helpers/formatDate';
import classNames from 'classnames';

interface ISlot {
  id: string;
  date: number;
  is_occupied: boolean;
  updateTimeslots: Dispatch<SetStateAction<ITimeslot[]>>;
  handleCancelTimeslot: () => void;
}

const Timeslot: React.FC<ISlot> = ({
  id,
  date,
  is_occupied,
  updateTimeslots,
  handleCancelTimeslot,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { addToast } = useToastContext();

  const handleDelete = (timeslotId: string) => {
    axiosDelete(`${TIMESLOTS}?timeslotId=${timeslotId}`).then(res => {
      if (res.message === 'Time slot successfully deleted') {
        setModalIsOpen(false);
        updateTimeslots(prevTimeslots =>
          prevTimeslots.filter(slot => slot.id !== id),
        );
        addToast({
          title: 'Horario eliminado',
          subText: 'El horario ha sido eliminado correctamente',
          type: 'default',
        });
      } else {
        setModalIsOpen(false);
        addToast({
          title: 'Horario no eliminado',
          subText: 'Hubo un error al intentar eliminar el horario.',
          type: 'error',
        });
      }
    });
  };

  return (
    <div className="flex flex-row m-5 rounded-md shadow-sm">
      <div
        className={classNames(
          'flex-shrink-0 flex items-center justify-center w-14 text-cardContentLight text-sm font-medium rounded-l-md',
          { 'bg-red-500': is_occupied, 'bg-green-500': !is_occupied },
        )}
      >
        <CalendarIcon style={{ padding: 12 }} />
      </div>
      <div
        className={classNames(
          'flex items-center justify-between flex-1 truncate border-t border-b border-r bg-cardContentLight rounded-r-md',
          {
            'border-red-500': is_occupied,
            'border-green-500': !is_occupied,
          },
        )}
      >
        <div className="flex-1 px-4 py-2 text-sm truncate">
          <p className="font-semibold text-mainTextColor">{formatDate(date)}</p>
          <p className="text-mainTextColor">
            Estado: {is_occupied ? 'agendada' : 'disponible'}
          </p>
        </div>
        <div className="flex-shrink-0 pr-2">
          <span className="relative z-0 inline-flex">
            {is_occupied && (
              <button
                type="button"
                className="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium bg-transparent text-mainTextColor"
                onClick={handleCancelTimeslot}
              >
                <XIcon className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
            {!is_occupied && (
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
        open={modalIsOpen}
        setModal={setModalIsOpen}
        confirmAction={() => handleDelete(id)}
        title="¿Seguro/a que quieres eliminar el horario?"
        description="Esta acción es irreversible"
      />
    </div>
  );
};

export default Timeslot;
