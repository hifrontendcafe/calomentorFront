import { Dispatch, Fragment, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import CustomButton from "../CustomButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { axiosPost } from "@/lib/api";
import { MENTORSHIP } from "@/config/Routes";
import useToastContext from "@/hooks/useToastContext";

interface IModal {
  menteeName: string;
  mentorshipToken: string;
  open: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  onCancelSubmit?: () => void;
}

interface ICancelForm {
  cancelCause: string;
}

const CancelModal: React.FC<IModal> = ({
  menteeName,
  mentorshipToken,
  open,
  setModal,
  onCancelSubmit,
}) => {
  const { addToast } = useToastContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ICancelForm>();

  const onSubmit: SubmitHandler<ICancelForm> = async ({ cancelCause }) => {
    axiosPost(MENTORSHIP, { token: mentorshipToken, cancelCause })
      .then(() => {
        addToast({
          title: "Cancelada",
          subText: "La mentoría ha sido cancelada satisfactoriamente.",
          type: "default",
        });
        onCancelSubmit ? onCancelSubmit() : console.log("tuvieja");
      })
      .catch(() => {
        addToast({
          title: "Hubo un problema",
          subText: "La mentoría no se ha podido cancelar",
          type: "error",
        });
      });
    reset();
    setModal(false);
  };

  const handleCloseModal = () => {
    reset();
    setModal(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleCloseModal}
      >
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-700 bg-opacity-75" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform border rounded-lg shadow-xl border-cardHeader bg-cardContent sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
                    <ExclamationIcon
                      className="w-8 h-8 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-red-500"
                    >
                      ¿Seguro/a que quieres cancelar la mentoría de {menteeName}
                      ?
                    </Dialog.Title>
                    <div className="my-5">
                      <p className="text-sm text-left text-gray-300">
                        Ésta acción es irreversible, por favor ingresá el motivo
                        por el cuál estás cancelando la mentoría. Este mensaje
                        será enviado por mail al usuario correspondiente:
                      </p>

                      <div className="my-5">
                        <textarea
                          className="custom_input"
                          placeholder="Mensaje..."
                          rows={6}
                          {...register("cancelCause", { required: true })}
                        />
                        {errors.cancelCause && (
                          <p className="pl-1 text-xs text-left text-red-600">
                            Este campo es requerido
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <CustomButton
                    bntLabel="Cancelar"
                    primary={false}
                    clickAction={handleCloseModal}
                    className="justify-center"
                  />
                  <CustomButton
                    type="submit"
                    bntLabel="Confirmar"
                    primary
                    className="justify-center"
                  />
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CancelModal;
