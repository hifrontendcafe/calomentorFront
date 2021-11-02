import React, { useEffect, useState } from 'react';
import CustomButton from '@/components/CustomButton';
import Image from 'next/image';
import FECGif from '@/assets/gif/Fec.gif';
import { axiosPatch } from '@/lib/api';
import useToastContext from '@/hooks/useToastContext';
import { MENTORSHIP } from '@/config/Routes';
import { useRouter } from 'next/dist/client/router';
import CustomHead from '@/components/CustomHead';
import { format } from 'date-fns';

const ConfirmMentorship: React.FC = () => {
  const { addToast } = useToastContext();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [alreadyConfirmed, setAlreadyConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [datetime, setDatetime] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const { date } = router.query;
    if (date) {
      const datetime = format(
        new Date(parseInt(date as string, 10)),
        "dd/MM/yyyy 'a las' HH:mm'hs.'",
      );
      setDatetime(datetime);
    }
  }, [router.query]);

  const handleConfirm = async () => {
    setIsLoading(true);
    const { token } = router.query;

    if (token) {
      axiosPatch(MENTORSHIP, {
        token,
      })
        .then(res => {
          if (res.message === 'Already cancelled') {
            setAlreadyConfirmed(true);
            setIsLoading(false);
          } else {
            setIsConfirmed(true);
            setIsLoading(false);
          }
        })
        .catch(() => {
          setIsLoading(false);
          addToast({
            title: 'Hubo un problema',
            subText: 'La mentoría no se ha podido confirmar',
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
      <CustomHead title="Confirmar mentoría" />
      <div className="flex items-center justify-center w-screen h-screen px-5 bg-cardHeader">
        <div className="inline-block w-full px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform border rounded-lg shadow-xl border-cardHeader bg-cardContent sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
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
            {(isConfirmed || alreadyConfirmed) && (
              <div className="flex items-center justify-center mt-10 mb-5">
                <p className="text-xl font-bold text-center text-mainTextColor">
                  {isConfirmed
                    ? 'La mentoría ha sido confirmada exitosamente.'
                    : 'La mentoría fue confirmada anteriormente o cancelada.'}
                </p>
              </div>
            )}
            {!isConfirmed && !alreadyConfirmed && !isLoading && (
              <div className="mt-3 text-center sm:mt-5">
                <h1 className="text-lg font-medium leading-6 text-mainTextColor">
                  ¿Confirmar mentoría?
                </h1>
                <div className="my-5">
                  <p className="text-sm text-gray-300">
                    La mentoría solicitada corresponde al día {datetime}
                  </p>
                </div>
              </div>
            )}
          </div>
          {!isConfirmed && !alreadyConfirmed && !isLoading && (
            <div className="flex justify-center mt-5 sm:mt-6">
              <CustomButton
                type="button"
                bntLabel="Confirmar"
                primary
                className="justify-center"
                clickAction={handleConfirm}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ConfirmMentorship;