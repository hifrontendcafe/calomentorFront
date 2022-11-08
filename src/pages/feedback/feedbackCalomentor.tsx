import React, { useState } from 'react';
import CustomButton from '@/components/CustomButton';
import Image from 'next/image';
import FECGif from '@/assets/gif/Fec.gif';
import { axiosPatch } from '@/lib/api';
import useToastContext from '@/hooks/useToastContext';
import { FEEDBACK } from '@/config/Routes';
import { useRouter } from 'next/dist/client/router';
import CustomHead from '@/components/CustomHead';
import StarButton from '@/components/StarButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFeedbackForm } from '@/interfaces/mentorship.interface';
import PwdByVercel from '@/components/PwdByVercel';

const MentorshipFeedback: React.FC = () => {
  const { addToast } = useToastContext();

  const [feedbackSent, setFeedbackSent] = useState(false);
  const [alreadySent, setAlreadySent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [fecFeedback, setFecFeedback] = useState(false);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
  } = useForm<IFeedbackForm>({
    mode: 'onChange',
    defaultValues: {},
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<any> = async ({
    feedback_mentee,
    feedback_mentee_private,
  }) => {
    setIsLoading(true);
    const { mentorship_token } = router.query;
    if (mentorship_token) {
      axiosPatch(FEEDBACK, {
        mentorship_token,
        feedback_mentee: feedback_mentee,
        feedback_mentee_private: feedback_mentee_private,
        feedback_stars: rating,
      })
        .then(res => {
          if (res.message === 'Feedback already sent') {
            setAlreadySent(true);
            setIsLoading(false);
          } else {
            setFeedbackSent(true);
            setIsLoading(false);
          }
        })
        .catch(() => {
          setIsLoading(false);
          addToast({
            title: 'Hubo un problema',
            subText: 'La mentoría no se ha podido calificar.',
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
      <CustomHead title="Feedback" />
      <div className="flex flex-col items-center justify-center w-full min-h-screen p-5 bg-cardHeader">
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
              {(alreadySent || feedbackSent) && (
                <div className="flex items-center justify-center mt-10 mb-5">
                  <p className="text-xl font-bold text-center text-mainTextColor">
                    {alreadySent
                      ? 'Ya nos has comentado sobre esta mentoría.'
                      : feedbackSent
                      ? 'Tu comentario ha sido enviado exitosamente.'
                      : null}
                  </p>
                </div>
              )}
              {!feedbackSent && !alreadySent && !isLoading && (
                <div className="mt-3 text-center sm:mt-5">
                  <h1 className="text-lg font-medium leading-6 text-mainTextColor">
                    ¿Cómo te fue en la mentoría?
                  </h1>
                  <div className="mx-6 my-5 md:mx-28">
                    <div className="grid grid-cols-5">
                      <StarButton
                        id={1}
                        setRating={setRating}
                        setHover={setHover}
                        hover={hover}
                        rating={rating}
                      />
                      <StarButton
                        id={2}
                        setRating={setRating}
                        setHover={setHover}
                        hover={hover}
                        rating={rating}
                      />
                      <StarButton
                        id={3}
                        setRating={setRating}
                        setHover={setHover}
                        hover={hover}
                        rating={rating}
                      />
                      <StarButton
                        id={4}
                        setHover={setHover}
                        setRating={setRating}
                        hover={hover}
                        rating={rating}
                      />
                      <StarButton
                        id={5}
                        setRating={setRating}
                        setHover={setHover}
                        hover={hover}
                        rating={rating}
                      />
                    </div>
                  </div>
                  <div className="my-5">
                    {/* <textarea
                      className="custom_input"
                      rows={5}
                      {...register('feedback_mentee', {
                        required: true,
                        minLength: {
                          value: 20,
                          message: 'La cantidad mínima de caracteres es de 20.',
                        },
                        maxLength: {
                          value: 500,
                          message: 'No se admiten más de 500 caracteres.',
                        },
                      })}
                    />
                    {errors.feedback_mentee && (
                      <p className="pl-1 text-xs text-left text-red-600">
                        {errors.feedback_mentee.message}
                      </p>
                    )} */}
                  </div>
                  <div className="relative flex items-start mx-5">
                    <div className="flex items-center h-5">
                      <input
                        id="enableFecFeedback"
                        onChange={val => {
                          setFecFeedback(val.target.checked);
                          if (!val.target.checked) {
                            setValue('feedback_mentee_private', '');
                          }
                        }}
                        name="enableFecFeedback"
                        type="checkbox"
                        className="w-4 h-4 bg-gray-500 rounded outline-none text-fecGreen focus:outline-none focus:ring-0 focus:border-0"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="enableFecFeedback"
                        className="font-medium text-left text-gray-200"
                      >
                        ¿Quieres comunicar algo al staff? (Esto no será visible
                        para el mentor)
                      </label>
                    </div>
                  </div>
                  {fecFeedback && (
                    <div className="my-5">
                      <textarea
                        className="custom_input"
                        rows={5}
                        maxLength={500}
                        {...register('feedback_mentee_private', {
                          minLength: {
                            value: 20,
                            message:
                              'La cantidad mínima de caracteres es de 20.',
                          },
                          maxLength: {
                            value: 500,
                            message:
                              'La cantidad máxima de caracteres es de 500.',
                          },
                        })}
                      />
                      {errors.feedback_mentee_private && (
                        <p className="pl-1 text-xs text-left text-red-600">
                          {errors.feedback_mentee_private.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
            {!feedbackSent && !alreadySent && !isLoading && (
              <div className="flex justify-center mt-5 sm:mt-6">
                <CustomButton
                  inputType="submit"
                  bntLabel="Enviar"
                  disabled={!isValid || rating === 0}
                  primary
                  className="justify-center"
                />
              </div>
            )}
          </form>
        </div>
        <PwdByVercel />
      </div>
    </>
  );
};

export default MentorshipFeedback;
