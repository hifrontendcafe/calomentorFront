import React, { Dispatch, SetStateAction, useState } from 'react';
import { IWarning, WARN, WARNSTATE } from '@/interfaces/warning.interface';
import { formatDate } from '@/helpers/formatDate';
import { SELF_HISTORY } from '@/config/Routes';
import Link from 'next/link';
import Modal from '../Modal';
import StatusLabelCard from '../StatusLabelCard';
import { useNextAuthSession } from '@/hooks/useNextAuthSession';
import { isAdmin } from '@/helpers/hasRole';
import { deleteWarning } from '@/services';

interface IWarningCard {
  warning: IWarning;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setWarnings: (id: string) => void;
}

const WarningCard: React.FC<IWarningCard> = ({
  warning: {
    id,
    mentee_id,
    mentee_username_discord,
    warning_author_name,
    warning_status,
    warn_cause,
    warn_type,
    warning_author_id,
    warning_date,
    forgive_author_id,
    forgive_author_name,
    forgive_cause,
  },
  setLoading,
  setWarnings,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenDeleteWarningConfirmation, setIsOpenDeleteWarningConfirmation] =
    useState<boolean>(false);
  const [session, loading] = useNextAuthSession();
  const isForgived = warning_status === WARNSTATE.FORGIVE;
  const date = String(warning_date);

  const statusLabel = {
    [WARNSTATE.FORGIVE]: (
      <StatusLabelCard title="Perdonada" bgColor="bg-green-500" />
    ),
    [WARNSTATE.ACTIVE]: <StatusLabelCard title="Activa" bgColor="bg-red-500" />,
  };

  const onDeleteWarning = async () => {
    setLoading(true);
    await deleteWarning(id);
    setWarnings(id);
    setLoading(false);
  };

  return (
    <>
      <tr className="border-b border-gray-700" key={id}>
        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-300 whitespace-nowrap sm:pl-6 md:pl-0">
          {formatDate(+date!)}
        </td>

        <td className="px-3 py-4 text-sm text-gray-300 whitespace-nowrap">
          <Link
            href={`${SELF_HISTORY}?name=${mentee_username_discord}&userId=${mentee_id}`}
          >
            <div className="font-bold hover:text-teal-500 cursor-pointer">
              {mentee_username_discord}
            </div>
            <div className="text-gray-400 hover:text-teal-500">
              ID {mentee_id}
            </div>
          </Link>
        </td>

        <td className="px-3 py-4 text-sm text-gray-300 whitespace-nowrap align-middle">
          <div className="font-bold">{statusLabel[warning_status]}</div>
        </td>

        <td className="px-3 py-4 text-sm text-gray-300 whitespace-nowrap">
          <div className="font-bold">{warning_author_name}</div>
          <div className="text-gray-400">ID {warning_author_id}</div>
        </td>

        <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6 md:pr-0">
          <div
            className="m-2 text-mainTextColor hover:text-teal-600 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            Mas info
            <span className="sr-only"></span>
          </div>
          {session && !loading && isAdmin(session.user.role) && (
            <div>
              <div
                className="text-mainTextColor hover:text-teal-600 cursor-pointer"
                onClick={() => setIsOpenDeleteWarningConfirmation(true)}
              >
                Remover registro
                <span className="sr-only"></span>
              </div>
            </div>
          )}
        </td>
      </tr>

      <Modal
        isOpen={isOpenDeleteWarningConfirmation}
        onOpenChange={setIsOpenDeleteWarningConfirmation}
        confirmAction={onDeleteWarning}
        title={'Deseas eliminar la penalización de la base de datos?'}
      />

      <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        renderButtons={false}
        title={`Mentee: ${mentee_username_discord} | Estado: ${
          isForgived ? 'Perdonado' : 'Activo'
        }`}
      >
        <div className="flex flex-col">
          <div>
            <p className="text-sm font-light">
              Fecha:{' '}
              {formatDate(
                Number(date.length === 16 ? date.slice(0, -3) : date),
              )}
            </p>
          </div>
          {isForgived ? (
            <>
              <div className="sm:col-span-1 mb-6 mt-4">
                <dt className="font-medium text-mainTextColor">
                  Perdonado por
                </dt>
                <dd className="mt-1 text-sm text-gray-200">
                  {forgive_author_name} - {forgive_author_id}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="font-medium text-mainTextColor">Motivo</dt>
                <dd className="mt-1 text-sm text-gray-200">{forgive_cause}</dd>
              </div>
            </>
          ) : (
            <>
              <div className="sm:col-span-1 mb-6 mt-4">
                <dt className="font-medium text-mainTextColor">
                  Tipo de warning
                </dt>
                <dd className="mt-1 text-sm text-gray-200">
                  {warn_type === WARN.COC_WARN
                    ? 'Incumplimiento del código de conducta'
                    : 'Ausencia'}
                </dd>
              </div>
              {warn_type === WARN.COC_WARN && (
                <div className="sm:col-span-1">
                  <dt className="font-medium text-mainTextColor">Causa</dt>
                  <dd className="mt-1 text-sm text-gray-200">{warn_cause}</dd>
                </div>
              )}
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default WarningCard;
