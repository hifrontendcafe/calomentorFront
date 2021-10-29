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
import CancelModal from "@/components/CancelModal";
import Spinner from "@/components/Spinner";

const SettingsSchedulePage: React.FC = () => {
  const [session, loading] = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timeslots, setTimeslots] = useState<ITimeslot[]>([]);
  const [addNew, setAddNew] = useState(false);
  const [modalData, setModalData] = useState<{
    mentorshipToken: string;
    menteeName: string;
  }>({ mentorshipToken: "", menteeName: "" });

  const removeTimeslot = () => {
    setTimeslots((prev) =>
      prev.filter((m) => m.tokenForCancel !== modalData.mentorshipToken)
    );
  };

  const handleModalConfirmBtn = (token: string, name: string) => {
    setModalData({
      mentorshipToken: token,
      menteeName: name,
    });
    setIsOpen(true);
  };

  const getSchedule = useCallback(() => {
    if (!loading && session) {
      axiosGet(`${TIMESLOTS}?id=${session.user.id.toString()}`)
        .then(({ data }) => {
          setTimeslots(data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
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
        <div className="py-5">
          {isLoading && <Spinner />}
          {!isLoading && timeslots?.length === 0 && (
            <div
              className={
                "border-green-500 flex items-center justify-between my-5 border bg-cardContentLight rounded-md"
              }
            >
              <div className="flex-1 px-4 py-2 text-sm truncate">
                <p className="py-2 text-center text-mainTextColor">
                  No tienes ningún horario registrado, presiona en el botón
                  &quot;Agregar&quot; para añadir uno.
                </p>
              </div>
            </div>
          )}
          {!isLoading &&
            timeslots.length > 0 &&
            timeslots.map((timeslot: ITimeslot) => (
              <Timeslot
                key={timeslot.id}
                id={timeslot.id}
                date={timeslot.date}
                is_occupied={timeslot.is_occupied}
                updateTimeslots={setTimeslots}
                handleCancelTimeslot={() =>
                  handleModalConfirmBtn(
                    timeslot.tokenForCancel,
                    timeslot.mentee_username
                  )
                }
              />
            ))}
        </div>
      </div>
      <CancelModal
        open={isOpen}
        mentorshipToken={modalData.mentorshipToken}
        menteeName={modalData.menteeName}
        setModal={setIsOpen}
        callback={removeTimeslot}
      />
    </SettingsPage>
  );
};

export default SettingsSchedulePage;
