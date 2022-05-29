import React from 'react';
import { Mentor, UserStatus } from '@/interfaces/user.interface';
import Image from 'next/image';
import classNames from 'classnames';
import GenericCard from '../GenericCard';
import Star from '@/assets/img/Star.svg';

interface IMentorCardSanity {
  mentor: Mentor;
}

const MentorCardSanity: React.FC<IMentorCardSanity> = ({
  mentor: {
    name,
    status,
    feedback,
    persona: { email },
    photo,
  },
}) => {
  return (
    <GenericCard
      bodyClassnames={classNames('rounded border', {
        'border-yellow-500 ': status === UserStatus.NOT_AVAILABLE,
        'border-green-500': status === UserStatus.ACTIVE,
        'border-red-500':
          !status ||
          status === UserStatus.INACTIVE ||
          status === UserStatus.OUT,
      })}
    >
      <div className="flex p-5 items-center">
        <div className="flex justify-between w-full">
          <div className="flex">
            <Image
              className="relative rounded-full flex-grow lg:mt-0 lg:flex-grow-0 lg:flex-shrink"
              src={
                photo?.src
                  ? `${photo.src}?h=200`
                  : 'https://res.cloudinary.com/frontendcafe/image/upload/v1631388475/defaultUserImage_advu4k.svg'
              }
              alt={photo?.alt ?? `Foto de ${name}`}
              width={70}
              height={70}
              blurDataURL={photo?.src ? `${photo.src}?h=50` : undefined}
            />
            <div className="flex flex-col justify-center ml-4">
              <h3 className="text-sm font-medium text-white">{name}</h3>
              <span className="text-sm text-white">{email}</span>
            </div>
          </div>
          <div className="flex">
            {Array.from({ length: feedback }, () => (
              <div className="flex items-center mr-2">
                <Image src={Star} width="20px" height="20px" alt="Star" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </GenericCard>
  );
};

export default MentorCardSanity;
