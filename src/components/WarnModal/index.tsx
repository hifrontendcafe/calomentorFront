import { Dispatch, Fragment, SetStateAction, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';
import CustomButton from '../CustomButton';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { axiosPost } from '@/lib/api';
import { WARNING } from '@/config/Routes';
import useToastContext from '@/hooks/useToastContext';
import { IWarnForm } from '@/interfaces/mentorship.interface';

interface IModal {
  mentee_name: string;
  menteeId: string;
  mentorshipId: string;
  open: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  callback?: () => void;
}

const WarnModal: React.FC<IModal> = ({
  mentee_name,
  menteeId,
  open,
  setModal,
  callback,
  mentorshipId,
}) => {
  const [causeEnabled, setCauseEnabled] = useState(false);
  const { addToast } = useToastContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<IWarnForm>();

  const onSubmit: SubmitHandler<IWarnForm> = async ({
    warn_cause,
    warn_type,
  }) => {
    axiosPost(WARNING, {
      mentee_id: menteeId,
      warn_type,
      warn_cause,
      mentorship_id: mentorshipId,
    })
      .then(() => {
        addToast({
          title: 'Advertido',
          subText: 'El usuario ha sido advertido satisfactoriamente.',
          type: 'default',
        });
        callback ? callback() : null;
      })
      .catch(() => {
        addToast({
          title: 'Hubo un problema',
          subText:
            'No se ha podido advertir al usuario, por favor contactá con alguien del Staff',
          type: 'error',
        });
      });
    reset();
    setModal(false);
  };

  const handleCloseModal = () => {
    setCauseEnabled(false);
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
                      Estás por dar una advertencia al usuario {mentee_name}
                    </Dialog.Title>
                    <div className="my-5">
                      <p className="text-sm text-left text-gray-300">
                        Ésta acción es irreversible, por favor ingresá el motivo
                        por el cuál estás penalizando al usuario.
                      </p>

                      <div className="my-5 text-left">
                        <label
                          htmlFor="warn_type"
                          className="block text-sm font-medium label"
                        >
                          Causa
                        </label>
                        <Controller
                          control={control}
                          name="warn_type"
                          render={({ field: { onChange, ref, value } }) => (
                            <select
                              id="warn_type"
                              className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-700 rounded-md custom_input focus:outline-none focus:ring-0 focus:border-fecGreen sm:text-sm"
                              value={value}
                              onChange={val => {
                                val.target.value === 'COC_WARN'
                                  ? setCauseEnabled(true)
                                  : setCauseEnabled(false);
                                onChange(val);
                              }}
                              ref={ref}
                            >
                              <option>Elegir una opción</option>
                              <option value="NO_ASSIST">Ausencia</option>
                              <option value="COC_WARN">
                                Incumplimiento del CoC
                              </option>
                            </select>
                          )}
                          rules={{ required: true }}
                        />
                        {errors.warn_type && (
                          <p className="pl-1 text-xs text-red-600">
                            El campo es requerido
                          </p>
                        )}
                      </div>
                      {causeEnabled && (
                        <div className="my-5">
                          <textarea
                            className="custom_input"
                            placeholder="Contanos que fue lo que sucedió"
                            rows={6}
                            {...register('warn_cause', { required: true })}
                          />
                          {errors.warn_cause && (
                            <p className="pl-1 text-xs text-left text-red-600">
                              Este campo es requerido
                            </p>
                          )}
                        </div>
                      )}
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
                    primary={false}
                    danger
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

export default WarnModal;
