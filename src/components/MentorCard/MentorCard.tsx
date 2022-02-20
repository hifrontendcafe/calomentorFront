import React, { useState } from 'react';
import { IUser } from '@/interfaces/user.interface';
import Image from 'next/image';
import { axiosPatch } from '@/lib/api';
import { USER } from '@/config/Routes';
import useToastContext from '@/hooks/useToastContext';
import classNames from 'classnames';
import GenericCard from '../GenericCard';
import CustomButton from '../CustomButton';
import { useSession } from 'next-auth/client';

interface IMentorCard {
  mentor: IUser;
}

const MentorCard: React.FC<IMentorCard> = ({
  mentor: { id, url_photo, full_name, email, isActive },
}) => {
  const [isActivated, setIsActivated] = useState(isActive);
  const [isLoading, setIsLoading] = useState(false);
  const [session] = useSession();
  const { addToast } = useToastContext();

  const renderButtonLabel = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-5">
          <div className="w-4 h-4 border-b-2 rounded-full border-fecGreen animate-spin"></div>
        </div>
      );
    } else if (isActivated) {
      return 'Deshabilitar';
    } else {
      return 'Habilitar';
    }
  };

  const handleButton = () => {
    setIsLoading(true);
    axiosPatch(USER, {
      userID: id,
      authorID: session?.user.id,
      isActive: !isActivated,
    })
      .then(() => {
        setIsLoading(false);
        setIsActivated(!isActivated);
        addToast({
          title: 'El usuario se ha actualizado',
          subText: `${full_name} ha sido ${
            !isActivated ? 'habilitado/a' : 'deshabilitado/a'
          }.`,
          type: 'default',
        });
      })
      .catch(() => {
        setIsLoading(false);
        addToast({
          title: 'El usuario no se ha actualizado',
          subText: `Ocurrió un problema al intentar actualizar a ${full_name}`,
          type: 'error',
        });
      });
  };

  return (
    <GenericCard
      bodyClassnames={classNames('rounded border', {
        'border-red-500 ': !isActivated,
        'border-green-500': isActivated,
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
        <CustomButton
          primary={!isActivated}
          danger={isActivated}
          bntLabel={renderButtonLabel()}
          clickAction={handleButton}
          className="h-10"
        />
      </div>
    </GenericCard>
  );
};

export default MentorCard;
