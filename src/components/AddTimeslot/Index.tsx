import useToastContext from "@/hooks/useToastContext";
import React, { ReactNode, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import CustomButton from "../Button";
import { axiosPost } from "@/lib/api";
import { useSession } from "next-auth/client";
import { TIMESLOTS } from "@/config/Routes";
import { set, addMonths } from "date-fns";
import DatePicker, {
  CalendarContainer,
  registerLocale,
} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { ITimeslot } from "@/interfaces/timeslot.interface";
registerLocale("es", es);

const DatePickerContainer: React.FC<{
  children: ReactNode[];
  className: string;
}> = ({ className, children }) => {
  return (
    <CalendarContainer className={className}>
      <div style={{ position: "relative" }}>{children}</div>
    </CalendarContainer>
  );
};

interface IAddTimeslot {
  getSchedule: () => void;
  close: () => void;
  visible: Boolean;
  timeslots: ITimeslot[];
}

interface ITimeForm {
  date: Date;
  time: Date;
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
    reset,
    control,
    getValues,
  } = useForm<ITimeForm>();

  const handleConfirmBtn: SubmitHandler<ITimeForm> = (data) => {
    if (!loading && session) {
      axiosPost(TIMESLOTS, {
        id: session.user.id.toString(),
        date: data.date?.toLocaleDateString(),
        time: data.time?.toLocaleTimeString(),
      }).then((res) => {
        if (res.message === "Time Slot added") {
          addToast({
            title: "Guardado",
            subText: "El nuevo horario ha sido agregado",
            type: "default",
          });
          reset();
          getSchedule();
        } else {
          reset();
          addToast({
            title: "Error",
            subText: "Hubo un problema al agregar el horario",
            type: "error",
          });
        }
        close();
      });
    }
  };

  const formatExcludedTimes = () => {
    let excludedTimes: Date[] = [];
    timeslots
      .filter(
        ({ slot_date }) => slot_date === getValues("date").toLocaleDateString()
      )
      .forEach(({ slot_time }) => {
        const [hours, minutes, segundos] = slot_time.split(":");
        excludedTimes.push(
          set(new Date(), {
            hours: parseInt(hours, 10),
            minutes: parseInt(minutes, 10),
          })
        );
      });
    setExcludedTimes(excludedTimes);
  };

  return (
    <>
      {visible && (
        <div
          className={
            "border-addTimeslot flex items-center justify-between flex-1 truncate border bg-cardContentLight rounded-md"
          }
        >
          <div className="flex-1 px-4 py-4 text-sm truncate">
            <form onSubmit={handleSubmit(handleConfirmBtn)}>
              <div className="flex flex-row items-center justify-between">
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
                          calendarContainer={DatePickerContainer}
                          className="custom_input"
                          selected={value}
                          onChange={(date) => {
                            onChange(date as Date);
                            formatExcludedTimes();
                          }}
                          locale="es"
                          minDate={new Date()}
                          maxDate={addMonths(new Date(), 2)}
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
                          calendarContainer={DatePickerContainer}
                          className="custom_input"
                          selected={value}
                          onChange={(date) => onChange(date as Date)}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Horario"
                          dateFormat="H:mm"
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
                <CustomButton
                  bntLabel="Confirmar"
                  type="submit"
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
