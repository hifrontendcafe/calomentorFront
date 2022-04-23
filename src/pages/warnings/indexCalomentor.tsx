import CustomButton from '@/components/CustomButton';
import CustomHead from '@/components/CustomHead';
import DashboardLayout from '@/components/DashboardLayout';
import GenericCard from '@/components/GenericCard';
import Modal from '@/components/Modal';
import WarningCard from '@/components/WarningCard';
import { HOME } from '@/config/Routes';
import { isAdmin } from '@/helpers/IsAdmin';
import useToastContext from '@/hooks/useToastContext';
import { IWarning, RemoveWarningForm } from '@/interfaces/warning.interface';
import { getWarnings, removeWarning } from '@/services';
import { Dialog } from '@headlessui/react';
import { DocumentRemoveIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export type WarningModalData = {
  warning_id: string;
  mentee_name: string;
};

const Warnings = () => {
  const [warnings, setWarnings] = useState<IWarning[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<WarningModalData>({
    warning_id: '',
    mentee_name: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [session, loading] = useSession();
  const router = useRouter();
  const { addToast } = useToastContext();
  const emptyWarnings = warnings.length === 0;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<RemoveWarningForm>();

  const onSubmit: SubmitHandler<RemoveWarningForm> = async ({
    forgive_cause,
  }) => {
    removeWarning(modalData.warning_id, forgive_cause)
      .then(() => {
        addToast({
          title: 'Advertencia removida',
          subText: 'Se ha removido la advertencia satisfactoriamente.',
          type: 'default',
        });
      })
      .catch(() => {
        addToast({
          title: 'Hubo un problema',
          subText: 'No se ha podido remover la advertencia.',
          type: 'error',
        });
      });
    reset();
    setIsOpen(false);
  };

  useEffect(() => {
    if (session && !loading) {
      isAdmin(session.user.role)
        ? getWarnings()
            .then(({ data }) => {
              setWarnings(data);
              setIsLoading(false);
            })
            .catch(err => console.log(err))
        : router.push(HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, router]);
  return (
    <>
      <CustomHead title="Blacklist" />
      <DashboardLayout title="Blacklist">
        <GenericCard
          isLoading={isLoading}
          isDataEmpty={emptyWarnings}
          noDataMessage="Actualmente no hay usuarios con advertencias 🥳"
        >
          {warnings.map(warn => (
            <WarningCard
              key={warn.id}
              warning={warn}
              setModalData={setModalData}
              setModalIsOpen={setIsOpen}
            />
          ))}
        </GenericCard>
        <Modal isOpen={isOpen} onOpenChange={setIsOpen} renderButtons={false}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-yellow-100 rounded-full">
                <DocumentRemoveIcon
                  className="w-8 h-8 text-yellow-500"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-yellow-500"
                >
                  Estás por remover la advertencia al usuario{' '}
                  {modalData.mentee_name}
                </Dialog.Title>
                <div className="my-5">
                  <p className="text-sm text-left text-gray-300">
                    Por favor ingresá el motivo por el cuál estás removiendo la
                    advertencia al usuario.
                  </p>
                  <div className="my-5">
                    <textarea
                      className="custom_input"
                      placeholder="Motivo..."
                      rows={6}
                      {...register('forgive_cause', { required: true })}
                    />
                    {errors.forgive_cause && (
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
                clickAction={() => setIsOpen(false)}
                className="justify-center"
              />
              <CustomButton
                inputType="submit"
                bntLabel="Confirmar"
                primary
                className="justify-center"
              />
            </div>
          </form>
        </Modal>
      </DashboardLayout>
    </>
  );
};

export default Warnings;
