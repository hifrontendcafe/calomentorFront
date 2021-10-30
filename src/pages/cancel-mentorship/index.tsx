import React, { useState } from 'react';
import CustomButton from '@/components/CustomButton';
import Image from 'next/image';
import FECGif from '@/assets/gif/Fec.gif';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ICancelForm } from '@/interfaces/mentorship.interface';
import { axiosPost, axiosPut } from '@/lib/api';
import useToastContext from '@/hooks/useToastContext';
import { MENTORSHIP, USER } from '@/config/Routes';
import { useRouter } from 'next/dist/client/router';
import CustomHead from '@/components/CustomHead';

const CancelMentorship: React.FC = () => {
  const { addToast } = useToastContext();
  const [isCanceled, setIsCanceled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ICancelForm>();

  const onSubmit: SubmitHandler<ICancelForm> = async ({ cancelCause }) => {
    setIsLoading(true);
    const { token } = router.query;

    if (token) {
      axiosPost(MENTORSHIP, {
        token,
        cancelCause,
        whoCancel: 'MENTEE',
      })
        .then(() => {
          setIsCanceled(true);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          addToast({
            title: 'Hubo un problema',
            subText: 'La mentoría no se ha podido cancelar',
            type: 'error',
          });
        });
    } else {
      setIsLoading(false);
      addToast({
        title: 'Hubo un problema',
        subText: 'La url es incorrecta',
        type: 'error',
      });
    }
  };

  return (
    <>
      <CustomHead title="Cancelar mentoría" />
      <div className="flex items-center justify-center w-screen h-screen px-5 bg-cardHeader">
        <div className="inline-block w-full px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform border rounded-lg shadow-xl border-cardHeader bg-cardContent sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="flex items-center justify-center mx-auto text-6xl rounded-full">
                <Image
                  src={FECGif}
                  width={90}
                  height={90}
                  alt="Fec gif"
                  className="rounded-full"
                />
              </div>
              {isLoading && (
                <div className="flex items-center justify-center mt-10 mb-5">
                  <div className="w-12 h-12 border-b-2 rounded-full border-fecGreen animate-spin"></div>
                </div>
              )}
              {isCanceled && (
                <div className="flex items-center justify-center mt-10 mb-5">
                  <p className="text-xl font-bold text-center text-mainTextColor">
                    La mentoría ha sido cancelada exitosamente
                  </p>
                </div>
              )}
              {!isCanceled && !isLoading && (
                <div className="mt-3 text-center sm:mt-5">
                  <h1 className="text-lg font-medium leading-6 text-red-500">
                    ¿Estás seguro/a que quieres cancelar la mentoría?
                  </h1>
                  <div className="my-5">
                    <p className="text-sm text-left text-gray-300">
                      Ésta acción es irreversible, por favor ingresá el motivo
                      por el cuál estás cancelando la mentoría.
                    </p>

                    <div className="my-5">
                      <textarea
                        className="custom_input"
                        placeholder="Mensaje..."
                        rows={6}
                        {...register('cancelCause', { required: true })}
                      />
                      {errors.cancelCause && (
                        <p className="pl-1 text-xs text-left text-red-600">
                          Este campo es requerido
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {!isCanceled && !isLoading && (
              <div className="flex items-end justify-end mt-5 sm:mt-6">
                <CustomButton
                  type="submit"
                  bntLabel="Confirmar"
                  primary
                  className="justify-center"
                />
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default CancelMentorship;
