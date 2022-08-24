import React from 'react';
import { Mentor, UserStatus } from '@/interfaces/user.interface';
import Image from 'next/image';
import GenericCard from '../GenericCard';
import StatusLabelCard from '../StatusLabelCard';
import Star from '@/assets/img/Star.svg';
import Calendly from '@/assets/img/calendly.svg';
import { FiMail } from 'react-icons/fi';
import { FaGithub, FaGlobe, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';
import { SELF_HISTORY } from '@/config/Routes';
interface IMentorCardSanity {
  mentor: Mentor;
}

const MentorCardSanity: React.FC<IMentorCardSanity> = ({
  mentor: {
    name,
    status,
    feedback,
    persona: {
      email,
      discordID: { current },
    },
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

  const selfhistoryUrl = `${SELF_HISTORY}?name=${name}&userId=${current}&isMentor=true`;

  return (
    <GenericCard>
      <div className="flex pb-5 items-center border-b border-zinc-800">
        <div className="flex justify-between w-full">
          <div className="flex flex-col h-40 md:h-24 w-1/3 items-center justify-center md:flex-row md:justify-start">
            <Image
              className="rounded-full lg:mt-0 lg:flex-grow-0 lg:flex-shrink"
              src={
                photo?.src
                  ? `${photo.src}`
                  : 'https://res.cloudinary.com/frontendcafe/image/upload/v1631388475/defaultUserImage_advu4k.svg'
              }
              alt={photo?.alt ?? `Foto de ${name}`}
              width={100}
              height={100}
              blurDataURL={photo?.src ? `${photo.src}?h=50` : undefined}
            />
            <div className="flex flex-col mt-4 justify-center ml-4">
              <Link href={selfhistoryUrl}>
                <a>
                  <h3 className="text-sm font-medium text-white cursor-pointer hover:text-teal-500">
                    {name}
                  </h3>
                </a>
              </Link>
              {statusLabel[status ?? UserStatus.OUT]}
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col justify-center items-center gap-4 md:flex-row md:justify-between">
              <div className="flex">
                <Link href={selfhistoryUrl}>
                  <a
                    target="_blank"
                    className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 ml-2 rounded-full text-primary bg-zinc-700 hover:bg-zinc-600"
                  >
                    🔥
                  </a>
                </Link>
                {calendly && (
                  <Link href={calendly}>
                    <a
                      target="_blank"
                      className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 ml-2 rounded-full text-primary bg-zinc-700 hover:bg-zinc-600"
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
                      className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 ml-2 rounded-full text-primary bg-zinc-700 hover:bg-zinc-600"
                    >
                      <FiMail width="20px" height="20px" />
                    </a>
                  </Link>
                )}
                {web && (
                  <Link href={web}>
                    <a
                      target="_blank"
                      className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 ml-2 rounded-full text-primary bg-zinc-700 hover:bg-zinc-600"
                    >
                      <FaGlobe width="20px" height="20px" />
                    </a>
                  </Link>
                )}
                {linkedin && (
                  <Link href={linkedin}>
                    <a
                      target="_blank"
                      className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 ml-2 rounded-full text-primary bg-zinc-700 hover:bg-zinc-600"
                    >
                      <FaLinkedin width="20px" height="20px" />
                    </a>
                  </Link>
                )}
                {github && (
                  <Link href={github}>
                    <a
                      target="_blank"
                      className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 ml-2 rounded-full text-primary bg-zinc-700 hover:bg-zinc-600"
                    >
                      <FaGithub width="20px" height="20px" />
                    </a>
                  </Link>
                )}
              </div>
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
