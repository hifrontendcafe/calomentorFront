import { formatDate } from '@/helpers/formatDate';
import { IMentorship } from '@/interfaces/mentorship.interface';
import React from 'react';
import { SELF_HISTORY } from '@/config/Routes';
import Link from 'next/link';
import { isAdmin } from '@/helpers/IsAdmin';
import { useNextAuthSession } from '@/hooks/useNextAuthSession';

interface IMentorshipCard {
  mentorship: IMentorship;
}

interface CardEventTarget extends EventTarget {
  id?: string;
}

interface CardMouseEvent extends React.MouseEvent<HTMLElement> {
  target: CardEventTarget;
}

const MentorshipCardFromBot: React.FC<IMentorshipCard> = ({
  mentorship: {
    id,
    mentee_id,
    mentee_name,
    mentor_name,
    mentorship_create_date,
    mentor_id,
  },
}) => {
  const [session, loading] = useNextAuthSession();
  return (
    <tr className="border-b border-gray-700" key={id}>
      <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-300 whitespace-nowrap sm:pl-6 md:pl-0">
        {formatDate(+mentorship_create_date!)}
      </td>
      <td className="px-3 py-4 text-sm text-gray-300 whitespace-nowrap">
        <Link
          href={`${SELF_HISTORY}?name=${mentor_name}&userId=${mentor_id}&isMentor=true`}
        >
          <a>
            <div className="font-bold cursor-pointer hover:text-teal-500">
              {mentor_name}
            </div>
            <div className="text-gray-400 hover:text-teal-500">
              ID {mentor_id}
            </div>
          </a>
        </Link>
      </td>
      <td className="px-3 py-4 text-sm text-gray-300 whitespace-nowrap">
        <Link href={`${SELF_HISTORY}?name=${mentee_name}&userId=${mentee_id}`}>
          <a>
            <div className="font-bold hover:text-teal-500">{mentee_name}</div>
            <div className="text-gray-400 hover:text-teal-500">
              ID {mentee_id}
            </div>
          </a>
        </Link>
      </td>
      {session && !loading && isAdmin(session.user.role) && (
        <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6 md:pr-0">
          <a href="#" className="text-mainTextColor hover:text-teal-600">
            Remover registro
            <span className="sr-only"></span>
          </a>
        </td>
      )}
    </tr>
  );
};

export default MentorshipCardFromBot;
