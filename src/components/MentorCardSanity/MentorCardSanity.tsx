import React from 'react';
import { Mentor, UserStatus } from '@/interfaces/user.interface';
import Image from 'next/image';
import classNames from 'classnames';
import GenericCard from '../GenericCard';
import Star from '@/assets/img/Star.svg';
import Calendly from '@/assets/img/calendly.svg';
import { FiMail } from 'react-icons/fi';
import { FaGithub, FaGlobe, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';
interface IMentorCardSanity {
  mentor: Mentor;
}

interface IStatusLabelCard {
  title: string;
  bgColor: string;
}

const StatusLabelCard = ({ title, bgColor }: IStatusLabelCard) => (
  <div className={`w-[6.5rem] h-5 mt-2 rounded flex items-center justify-center ${bgColor}`}>
    <span className='text-[0.6rem]'>{title}</span>
  </div>
);

const MentorCardSanity: React.FC<IMentorCardSanity> = ({
  mentor: {
    name,
    status,
    feedback,
    persona: { email },
    photo,
    web,
    calendly,
    linkedin,
    github,
  },
}) => {
  const statusLabel = {
    [UserStatus.NOT_AVAILABLE]: (
      <StatusLabelCard title="No disponible" bgColor="bg-yellow-500" />
    ),
    [UserStatus.ACTIVE]: (
      <StatusLabelCard title="Activo" bgColor="bg-green-500" />
    ),
    [UserStatus.INACTIVE]: (
      <StatusLabelCard title="Inactivo" bgColor="bg-red-500" />
    ),
    [UserStatus.OUT]: (
      <StatusLabelCard title="Fuera del programa" bgColor="bg-red-500" />
    ),
  };
  return (
    <GenericCard>
      <div className="flex pb-5 items-center border-b border-zinc-800">
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
              {statusLabel[status ?? UserStatus.OUT]}
            </div>
          </div>
          <div className="flex">
            <div className="flex justify-between items-center">
              {calendly && (
                <Link href={calendly}>
                  <a
                    target="_blank"
                    className="flex items-center justify-center w-8 h-8 ml-2 rounded-full text-primary bg-zinc-700"
                  >
                    <Image
                      src={Calendly}
                      width="20px"
                      height="20px"
                      alt={`Calendly de ${name}`}
                    />
                  </a>
                </Link>
              )}
              {email && (
                <Link href={email}>
                  <a
                    target="_blank"
                    className="flex items-center justify-center w-8 h-8 ml-2 rounded-full text-primary bg-zinc-700"
                  >
                    <FiMail width="20px" height="20px" />
                  </a>
                </Link>
              )}
              {web && (
                <Link href={web}>
                  <a
                    target="_blank"
                    className="flex items-center justify-center w-8 h-8 ml-2 rounded-full text-primary bg-zinc-700"
                  >
                    <FaGlobe width="20px" height="20px" />
                  </a>
                </Link>
              )}
              {linkedin && (
                <Link href={linkedin}>
                  <a
                    target="_blank"
                    className="flex items-center justify-center w-8 h-8 ml-2 rounded-full text-primary bg-zinc-700"
                  >
                    <FaLinkedin width="20px" height="20px" />
                  </a>
                </Link>
              )}
              {github && (
                <Link href={github}>
                  <a
                    target="_blank"
                    className="flex items-center justify-center w-8 h-8 ml-2 rounded-full text-primary bg-zinc-700"
                  >
                    <FaGithub width="20px" height="20px" />
                  </a>
                </Link>
              )}
              <div className="flex ml-5">
                {Array.from({ length: feedback }, (_, index) => (
                  <div
                    key={index.toString()}
                    className="flex items-center mr-2"
                  >
                    <Image src={Star} width="20px" height="20px" alt="Star" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </GenericCard>
  );
};

export default MentorCardSanity;
