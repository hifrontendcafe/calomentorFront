import React, { useState } from 'react';
import { User, UserStatus } from '@/interfaces/user.interface';
import Image from 'next/image';
import { axiosPatch } from '@/lib/api';
import { USER } from '@/config/Routes';
import useToastContext from '@/hooks/useToastContext';
import classNames from 'classnames';
import GenericCard from '../GenericCard';
import CustomButton from '../CustomButton';

import ButtonSpinner from '../ButtonSpinner';
import Modal from '../Modal';
import { HiOutlineExclamation } from 'react-icons/hi';
import { useNextAuthSession } from '@/hooks/useNextAuthSession';

interface IMentorCard {
  mentor: User;
}

const MentorCard: React.FC<IMentorCard> = ({
  mentor: { id, url_photo, full_name, email, user_status },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [userOutOfProgram, setUserOutOfProgram] = useState(
    user_status === UserStatus.OUT,
  );
  const [userIsActive, setUserIsActive] = useState(
    user_status !== UserStatus.OUT &&
      user_status === UserStatus.ACTIVE,
  );
  const [session] = useNextAuthSession();
  const { addToast } = useToastContext();

  const renderActivateButtonLabel = () => {
    if (isLoading1) {
      return <ButtonSpinner />;
    } else if (userIsActive) {
      return 'Deshabilitar';
    } else {
      return 'Habilitar';
    }
  };

  const renderOopButton = () => {
    if (isLoading2) {
      return <ButtonSpinner />;
    } else if (userOutOfProgram) {
      return 'Dar de Alta';
    } else {
      return 'Dar de Baja';
    }
  };

  const handleButton = (newStatus: UserStatus) => {
    axiosPatch(USER, {
      id,
      modified_by: session?.user.id,
      user_status: newStatus,
    })
      .then(() => {
        if (newStatus !== UserStatus.OUT) {
          if (newStatus === UserStatus.ACTIVE) {
            setUserIsActive(true);
          } else {
            setUserIsActive(false);
          }
          setUserOutOfProgram(false);
        } else {
          setUserOutOfProgram(true);
          setUserIsActive(false);
        }
        setIsLoading1(false);
        setIsLoading2(false);
        addToast({
          title: 'El usuario se ha actualizado correctamente',
          type: 'default',
        });
      })
      .catch(() => {
        setIsLoading1(false);
        setIsLoading2(false);
        addToast({
          title: 'El usuario no se ha actualizado',
          type: 'error',
        });
      });
  };

  return (
    <GenericCard
      bodyClassnames={classNames('rounded border', {
        'border-yellow-500 ': !userOutOfProgram && !userIsActive,
        'border-green-500': !userOutOfProgram && userIsActive,
        'border-red-500': userOutOfProgram,
      })}
    >
      <div className="flex p-5 items-center">
        <div className="flex w-full">
          <Image
            className="relative rounded-full flex-grow lg:mt-0 lg:flex-grow-0 lg:flex-shrink"
            src={
              url_photo
                ? url_photo
                : 'https://res.cloudinary.com/frontendcafe/image/upload/v1631388475/defaultUserImage_advu4k.svg'
            }
            alt="Mentor profile image"
            width="60px"
            height="60px"
          />
          <div className="flex flex-col justify-center ml-4">
            <h3 className="text-sm font-medium text-white">{full_name}</h3>
            <span className="text-sm text-white">{email}</span>
          </div>
        </div>
        <div className="flex gap-2">
          {!userOutOfProgram && (
            <CustomButton
              primary={!userIsActive}
              danger={userIsActive}
              bntLabel={renderActivateButtonLabel()}
              clickAction={() => {
                setIsLoading1(true);
                handleButton(
                  userIsActive ? UserStatus.INACTIVE : UserStatus.ACTIVE,
                );
              }}
              className="h-10"
            />
          )}
          <CustomButton
            primary
            danger
            bntLabel={renderOopButton()}
            clickAction={() => setIsModalOpen(true)}
            className="h-10"
          />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={`Estás por dar de ${
          userOutOfProgram ? 'alta' : 'baja'
        } a ${full_name}`}
        confirmAction={() => {
          setIsModalOpen(false);
          setIsLoading2(true);
          handleButton(
            userOutOfProgram
              ? UserStatus.INACTIVE
              : UserStatus.OUT,
          );
        }}
        danger
        Icon={HiOutlineExclamation}
        iconContainerClassName="bg-red-200"
        iconClassName="text-red-500"
        childrenClassName="text-left"
      >
        Al hacer esto el usuario dejará de aparecer en la web. (No se van a
        perder datos del usuario)
      </Modal>
    </GenericCard>
  );
};

export default MentorCard;
