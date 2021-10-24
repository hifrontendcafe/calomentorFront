import React, { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import CustomButton from "@/components/CustomButton";
import Timeslot from "@/components/Timeslot";
import { PlusIcon, XIcon } from "@heroicons/react/outline";
import SettingsPage from "..";
import { ITimeslot } from "@/interfaces/timeslot.interface";
import { axiosGet } from "@/lib/api";
import { TIMESLOTS } from "@/config/Routes";
import AddTimeslot from "@/components/AddTimeslot/Index";

const SettingsSchedulePage: React.FC = () => {
  const [session, loading] = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [timeslots, setTimeslots] = useState<ITimeslot[]>([]);
  const [addNew, setAddNew] = useState(false);

  const getSchedule = useCallback(() => {
    if (!loading && session) {
      setIsLoading(true);
      axiosGet(`${TIMESLOTS}?id=${session.user.id.toString()}`)
        .then(({ data }) => setTimeslots(data))
        .catch((err) => console.log(err));
      setIsLoading(false);
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
    <SettingsPage
      title="Horarios"
      description="Configuración de horarios disponibles para mentorías"
      component={
        <CustomButton
          bntIcon={
            !addNew ? (
              <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            ) : (
              <XIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            )
          }
          bntLabel={addNew ? "Cancelar" : "Agregar"}
          primary
          clickAction={() => setAddNew(!addNew)}
        />
      }
    >
      <div className="my-4">
        <AddTimeslot
          getSchedule={getSchedule}
          visible={addNew}
          close={() => setAddNew(false)}
          timeslots={timeslots}
        />
        {!isLoading && timeslots?.length === 0 && (
          <div
            className={
              "border-green-500 flex items-center justify-between flex-1 my-5 border bg-cardContentLight rounded-md"
            }
          >
            <div className="flex-1 px-4 py-2 text-sm truncate">
              <p className="py-2 text-center text-mainTextColor">
                No tienes ningún horario registrado, presiona en el botón
                &quot;Agregar&quot; para añadir uno.
              </p>
            </div>
            <div className="flex-shrink-0 pr-2"></div>
          </div>
        )}
        {!isLoading &&
          timeslots?.map((timeslot: ITimeslot) => (
            <Timeslot
              key={timeslot.id}
              id={timeslot.id}
              date={timeslot.date}
              is_occupied={timeslot.is_occupied}
              updateTimeslots={setTimeslots}
            />
          ))}
      </div>
    </SettingsPage>
  );
};

export default SettingsSchedulePage;
