import React, { useState } from 'react';
import { IUser } from '@/interfaces/user.interface';
import Image from 'next/image';
import { axiosPatch } from '@/lib/api';
import { USER } from '@/config/Routes';
import useUserContext from '@/hooks/useUserContext';
import useToastContext from '@/hooks/useToastContext';

interface IMentorCard {
  mentor: IUser;
}

const MentorCard: React.FC<IMentorCard> = ({
  mentor: { id, url_photo, full_name, email, isActive },
}) => {
  const [isActivated, setIsActivated] = useState(isActive);
  const { state } = useUserContext();
  const { addToast } = useToastContext();

  const handleButton = () => {
    axiosPatch(USER, { userID: id, authorID: state.id, isActive: !isActivated })
      .then(() => {
        addToast({
          title: 'El usuario se ha actualizado',
          subText: `${full_name} ha sido ${
            !isActivated ? 'habilitado/a' : 'deshabilitado/a'
          }.`,
          type: 'default',
        });
        setIsActivated(!isActivated);
      })
      .catch(() => {
        addToast({
          title: 'El usuario no se ha actualizado',
          subText: `Ocurrió un problema al intentar actualizar a ${full_name}`,
          type: 'error',
        });
      });
  };

  return (
    <div className="flex flex-col col-span-1 text-center divide-y divide-gray-200 rounded-lg bg-cardContent">
      <div className="flex flex-col p-8">
        <div className="flex-grow mt-6 lg:mt-0 lg:flex-grow-0 lg:flex-shrink-0">
          <Image
            className="relative rounded-full"
            src={
              url_photo
                ? url_photo
                : 'https://res.cloudinary.com/frontendcafe/image/upload/v1631388475/defaultUserImage_advu4k.svg'
            }
            alt="Mentor profile image"
            width="180px"
            height="180px"
          />
        </div>
        <h3 className="mt-6 text-sm font-medium text-white">{full_name}</h3>
        <div className="flex flex-col justify-between flex-grow mt-1">
          <span className="text-sm text-white">{email}</span>
        </div>
      </div>
      <div>
        <div className="flex -mt-px divide-x divide-gray-200">
          <div className="flex flex-1 w-0">
            <button
              onClick={handleButton}
              className={`relative tracking-wider inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-medium text-gray-300 border rounded-bl-lg border-cardContentLight hover:text-gray-500 ${
                isActivated
                  ? 'text-red-300 hover:text-red-500'
                  : 'text-green-300 hover:text-green-500'
              }`}
            >
              <span className="ml-3">
                {isActivated ? 'Deshabilitar' : 'Habilitar'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
