import React, { useEffect, useState } from 'react';
import CustomButton from '@/components/CustomButton';
import Image from 'next/image';
import FECGif from '@/assets/gif/Fec.gif';
import useToastContext from '@/hooks/useToastContext';
import { useRouter } from 'next/dist/client/router';
import CustomHead from '@/components/CustomHead';
import StarButton from '@/components/StarButton';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IFeedbackForm } from '@/interfaces/mentorship.interface';
import PwdByVercel from '@/components/PwdByVercel';
import { useGetAllMentorsQuery, useSendFeebackMutation } from '@/provider';
import Spinner from '@/components/Spinner';
import { Mentor, UserStatus } from '@/interfaces/user.interface';
import Select from 'react-select';

const MentorshipFeedback: React.FC = () => {
  const { addToast } = useToastContext();

  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [fecFeedback, setFecFeedback] = useState(false);
  const [mentorFromQuery, setMentorFromQuery] = useState<
    (Mentor & { value: string; label: string }) | null
  >(null);

  const {
    data: mentors,
    isLoading,
    isSuccess,
    isError,
  } = useGetAllMentorsQuery({});

  const [
    sendFeedback,
    {
      isError: isErrorFeedback,
      isLoading: isLoadingFeedback,
      isSuccess: isSuccessFeedback,
    },
  ] = useSendFeebackMutation();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
    setValue,
  } = useForm<IFeedbackForm>({
    mode: 'onChange',
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<IFeedbackForm> = async ({
    feedback_mentee_q_1,
    feedback_mentee_q_2,
    feedback_mentee_private,
    mentee_username_discord,
    mentee_name,
    mentee_id,
    mentor,
  }) => {
    const body = {
      mentor_id: mentor.persona.discordID.current,
      mentor_username_discord: mentor.persona.username,
      mentor_name: mentor.name,
      mentee_id,
      mentee_username_discord,
      mentee_name,
      feedback_date: String(Date.now()),
      feedback_stars: rating,
      feedback_mentee: {
        '¿Qué te gusto de la sesión?': feedback_mentee_q_1,
        '¿Qué podría haber sido mejor de la sesión?': feedback_mentee_q_2,
      },
      feedback_mentee_private,
    };

    void sendFeedback(body);
  };

  useEffect(() => {
    if (router.query && mentors) {
      setMentorFromQuery(
        mentors?.find(
          mentor => mentor.persona.discordID.current === router.query.mentorId,
        ) ?? null,
      );
      setValue(
        'mentor',
        // @ts-ignore
        mentors?.find(
          mentor => mentor.persona.discordID.current === router.query.mentorId,
        ),
      );
      setValue('mentee_id', String(router.query.menteeId));
      setValue('mentee_username_discord', String(router.query.menteeUsername));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, mentors]);

  useEffect(() => {
    if (isErrorFeedback) {
      addToast({
        title: 'Error al enviar feedback',
        type: 'error',
        subText: 'Hubo un error al enviar feedback',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorFeedback]);

  return (
    <>
      <CustomHead title="Feedback" />
      {!isLoading && !isSuccess && isError && (
        <div
          className={
            'border-green-500 mx-4 flex items-center justify-between my-5 border bg-cardContentLight rounded-md'
          }
        >
          <div className="flex-1 px-4 py-2 text-sm">
            <p className="py-2 text-center text-mainTextColor">
              Hubo un error recargue la página.
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center w-full min-h-screen p-5 bg-cardHeader">
        <div className="inline-block w-full px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform border rounded-lg shadow-xl border-cardHeader bg-cardContent sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          {isLoading && <Spinner />}
          {!isLoading && (
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
                {isLoadingFeedback && (
                  <div className="flex items-center justify-center mt-10 mb-5">
                    <div className="w-12 h-12 border-b-2 rounded-full border-fecGreen animate-spin" />
                  </div>
                )}
                {isSuccessFeedback && (
                  <div className="flex items-center justify-center mt-10 mb-5">
                    <p className="text-xl font-bold text-center text-mainTextColor">
                      Tu comentario ha sido enviado exitosamente.
                    </p>
                  </div>
                )}
                {!isSuccessFeedback && !isLoadingFeedback && (
                  <div className="mt-3 text-center sm:mt-5">
                    <h1 className="text-lg font-medium leading-6 text-mainTextColor">
                      ¿Cómo te fue en la mentoría?
                    </h1>
                    <div className="mx-6 my-5 md:mx-28">
                      <div className="grid grid-cols-5">
                        {Array.from({ length: 5 }, (_, index) => (
                          <StarButton
                            key={index.toString()}
                            id={index}
                            setRating={setRating}
                            setHover={setHover}
                            hover={hover}
                            rating={rating}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="my-5">
                      <label
                        htmlFor="mentor_name"
                        className="block text-sm font-medium label mb-4"
                      >
                        Elegí tu mentor*
                      </label>
                      <Controller
                        control={control}
                        name="mentor"
                        render={({ field: { onChange, ref, value } }) => {
                          return (
                            <Select
                              instanceId="superUniqueID"
                              value={
                                mentorFromQuery ??
                                mentors?.find(
                                  c =>
                                    // @ts-ignore
                                    c.persona?.discordID?.current === value,
                                )
                              }
                              onChange={val =>
                                // @ts-ignore
                                onChange(val.persona?.discordID?.current)
                              }
                              // @ts-ignore
                              options={mentors.filter(
                                mentor =>
                                  mentor.status &&
                                  [UserStatus.ACTIVE].includes(mentor.status),
                              )}
                              classNamePrefix="react-select"
                              className="filter-selector"
                              isDisabled={Boolean(mentorFromQuery)}
                            />
                          );
                        }}
                        rules={{ required: true }}
                      />
                      {errors.mentee_name && (
                        <p className="pl-1 text-xs text-red-600">
                          El campo es requerido
                        </p>
                      )}
                    </div>
                    <div className="my-5">
                      <label
                        htmlFor="mentee_name"
                        className="block text-sm font-medium label mb-4"
                      >
                        Tu nombre
                      </label>
                      <input
                        className="custom_input"
                        type={'text'}
                        placeholder="Ingresá tu nombre y apellido"
                        {...register('mentee_name', {
                          required: true,
                        })}
                      />
                      {errors.mentee_name && (
                        <p className="pl-1 text-xs text-left text-red-600">
                          {errors.mentee_name.message}
                        </p>
                      )}
                    </div>
                    <div className="my-5">
                      <label
                        htmlFor="mentee_username_discord"
                        className="block text-sm font-medium label mb-4"
                      >
                        Tu user de Discord
                      </label>
                      <input
                        className="custom_input"
                        type={'text'}
                        placeholder="Ingresá tu username de Discord"
                        {...register('mentee_username_discord', {
                          required: true,
                          disabled: Boolean(router.query.menteeId),
                        })}
                      />
                      {errors.mentee_username_discord && (
                        <p className="pl-1 text-xs text-left text-red-600">
                          {errors.mentee_username_discord.message}
                        </p>
                      )}
                    </div>
                    <div className="my-5">
                      <label
                        htmlFor="feedback_mentee_q_1"
                        className="block text-sm font-medium label mb-4"
                      >
                        ¿Qué te gusto de la sesión?
                      </label>
                      <textarea
                        id="feedback_mentee_q_1"
                        className="custom_input"
                        rows={5}
                        {...register('feedback_mentee_q_1', {
                          required: true,
                          minLength: {
                            value: 20,
                            message:
                              'La cantidad mínima de caracteres es de 20.',
                          },
                          maxLength: {
                            value: 500,
                            message: 'No se admiten más de 500 caracteres.',
                          },
                        })}
                      />
                      {errors.feedback_mentee_q_1 && (
                        <p className="pl-1 text-xs text-left text-red-600">
                          {errors.feedback_mentee_q_1.message}
                        </p>
                      )}
                    </div>
                    <div className="my-5">
                      <label
                        htmlFor="feedback_mentee_q_2"
                        className="block text-sm font-medium label mb-4"
                      >
                        ¿Qué podría haber sido mejor de la sesión?
                      </label>
                      <textarea
                        id="feedback_mentee_q_2"
                        className="custom_input"
                        rows={5}
                        {...register('feedback_mentee_q_2', {
                          required: true,
                          minLength: {
                            value: 20,
                            message:
                              'La cantidad mínima de caracteres es de 20.',
                          },
                          maxLength: {
                            value: 500,
                            message: 'No se admiten más de 500 caracteres.',
                          },
                        })}
                      />
                      {errors.feedback_mentee_q_2 && (
                        <p className="pl-1 text-xs text-left text-red-600">
                          {errors.feedback_mentee_q_2.message}
                        </p>
                      )}
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
                          ¿Quieres comunicar algo al staff? (Esto no será
                          visible para el mentor)
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
              {!isSuccessFeedback && !isLoading && !isLoadingFeedback && (
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
          )}
        </div>
        <p className="font-medium text-left text-gray-200">
          Si tienes problemas para dejar feedback, contactate con el equipo de
          mentorias{' '}
          <a
            className="hover:text-fecGreen"
            href="https://discord.com/channels/594363964499165194/897161654377271346"
          >
            aquí.
          </a>
        </p>
        <PwdByVercel />
      </div>
    </>
  );
};

export default MentorshipFeedback;
