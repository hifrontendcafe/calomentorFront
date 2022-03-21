import useToastContext from '@/hooks/useToastContext';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import CustomButton from '../CustomButton';
import { axiosPost } from '@/lib/api';
import { useSession } from 'next-auth/client';
import { TIMESLOTS } from '@/config/Routes';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { ITimeSlot } from '@/interfaces/timeslot.interface';

interface IAddTimeslot {
  getSchedule: () => void;
  close: () => void;
  visible: Boolean;
  timeslots: ITimeSlot[];
}

interface ITimeForm {
  date: Date;
  time: Date;
  duration: number;
}

const AddTimeslot: React.FC<IAddTimeslot> = ({
  getSchedule,
  visible,
  close,
  timeslots,
}) => {
  const [excludedTimes, setExcludedTimes] = useState<Date[]>([]);
  const [session, loading] = useSession();
  const { addToast } = useToastContext();
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    control,
    getValues,
  } = useForm<ITimeForm>();

  const unifyDates = (date1: Date, date2: Date) => {
    return dayjs(new Date(date1))
      .add(dayjs(new Date(date2)).hour(), 'hour')
      .add(dayjs(new Date(date2)).minute(), 'minute');
  };

  const handleConfirmBtn: SubmitHandler<ITimeForm> = data => {
    if (!loading && session) {
      axiosPost(TIMESLOTS, {
        user_id: session.user.id.toString(),
        slot_date: unifyDates(data.date, data.time).toDate().getTime(),
        duration: data.duration,
      })
        .then(() => {
          addToast({
            title: 'Guardado',
            subText: 'El nuevo horario ha sido agregado',
            type: 'default',
          });
          reset();
          getSchedule();
          close();
        })
        .catch(() => {
          reset();
          addToast({
            title: 'Error',
            subText: 'Hubo un problema al agregar el horario',
            type: 'error',
          });
          close();
        });
    }
  };

  const formatExcludedTimes = () => {
    let excludedTimes: Date[] = [];
    timeslots
      .filter(
        ({ date }) =>
          dayjs(date).format('dd/MM/yyyy') ===
          dayjs(getValues('date')).format('dd/MM/yyyy'),
      )
      .forEach(({ date: time }) => {
        const [hours, minutes] = dayjs(time).format('HH:mm').split(':');
        // const [hours, minutes] = format(new Date(time), 'HH:mm').split(':');
        excludedTimes.push(
          dayjs()
            .hour(parseInt(hours, 10))
            .minute(parseInt(minutes, 10))
            .toDate(),
        );
      });
    setExcludedTimes(excludedTimes);
  };

  const mentorshipDuration = [
    { id: '30 minutos', label: '30 minutos', value: 30 },
    { id: '45 minutos', label: '45 minutos', value: 45 },
    { id: '60 minutos', label: '60 minutos', value: 60 },
  ];

  return (
    <>
      {visible && (
        <div
          className={
            'border-addTimeslot flex items-center justify-between flex-1 mx-4 truncate border bg-cardContentLight rounded-md'
          }
        >
          <div className="flex-1 px-4 py-4 text-sm truncate">
            <form onSubmit={handleSubmit(handleConfirmBtn)}>
              <div className="flex flex-row items-center justify-evenly">
                <div className="flex flex-col">
                  <div className="flex flex-row items-center">
                    <label
                      htmlFor="date"
                      className="block mr-4 text-sm font-medium label"
                    >
                      Fecha
                    </label>
                    <Controller
                      control={control}
                      name="date"
                      render={({ field: { onChange, ref, value } }) => (
                        <DatePicker
                          ref={ref}
                          className="custom_input"
                          selected={value}
                          onChange={date => {
                            onChange(date as Date);
                            formatExcludedTimes();
                          }}
                          minDate={new Date()}
                          maxDate={dayjs().add(2, 'month').toDate()}
                          showDisabledMonthNavigation
                          dateFormat="dd/MM/yyyy"
                        />
                      )}
                      rules={{ required: true }}
                    />
                  </div>
                  <div className="flex justify-center">
                    {errors.date && (
                      <p className="pl-1 text-xs text-red-600">
                        El campo es requerido
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row items-center">
                    <label
                      htmlFor="time"
                      className="block mr-4 text-sm font-medium label"
                    >
                      Horario
                    </label>
                    <Controller
                      control={control}
                      name="time"
                      render={({ field: { onChange, ref, value } }) => (
                        <DatePicker
                          ref={ref}
                          className="custom_input"
                          selected={value}
                          minTime={new Date()}
                          maxTime={new Date('01/01/2023 11:59 PM')}
                          onChange={date => onChange(date as Date)}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Horario"
                          dateFormat="HH:mm"
                          excludeTimes={excludedTimes}
                        />
                      )}
                      rules={{ required: true }}
                    />
                  </div>
                  <div className="flex justify-center">
                    {errors.time && (
                      <p className="pl-1 text-xs text-red-600">
                        El campo es requerido
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div>
                    <label
                      htmlFor="duration"
                      className="block mr-4 text-sm font-medium label"
                    >
                      Duración
                    </label>
                    <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                      {mentorshipDuration.map(duration => (
                        <div key={duration.id} className="flex items-center">
                          <input
                            id={duration.id}
                            value={duration.value}
                            type="radio"
                            defaultChecked={duration.id === '60 minutos'}
                            className="h-4 w-4 text-fecGreen focus:ring-0"
                            {...register('duration', {
                              required: true,
                            })}
                          />
                          <label
                            htmlFor={duration.id}
                            className="ml-3 block text-sm font-medium text-gray-300"
                          >
                            {duration.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <CustomButton
                  bntLabel="Confirmar"
                  inputType="submit"
                  primary
                  className="mt-1"
                />
              </div>
            </form>
          </div>
          <div className="flex-shrink-0 pr-2"></div>
        </div>
      )}
    </>
  );
};

export default AddTimeslot;
