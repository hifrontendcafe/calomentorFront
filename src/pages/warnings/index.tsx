import { useCallback, useContext, useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/client';
import DashboardLayout from '@/components/DashboardLayout';
import { useRouter } from 'next/dist/client/router';
import { UserContext } from '@/context/UserContext';
import CustomHead from '@/components/CustomHead';
import { PROFILE } from '@/config/Routes';
import { IMentorhip } from '@/interfaces/mentorship.interface';
import HistoryMentorshipCard from '@/components/HistoryMentorshipCard';
import Spinner from '@/components/Spinner';
import { getAllMentorshipHistory, getUserData } from '@/services/index';
import WarnModal from '@/components/WarnModal';
import { ChevronRightIcon, ExclamationIcon } from '@heroicons/react/outline';

interface CardEventTarget extends EventTarget {
  id?: string;
}

interface CardMouseEvent extends React.MouseEvent<HTMLElement> {
  target: CardEventTarget;
}

const Warnings: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [mentorships, setMentorships] = useState<IMentorhip[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState({
    menteeName: '',
    menteeId: '',
    mentorshipId: '',
  });
  const [session, loadingUser] = useSession();

  const { dispatch } = useContext(UserContext);
  const router = useRouter();

  const getWarningData = useCallback(() => {
    if (!loadingUser && session) {
      const userID = session.user.id.toString();
      // Get user mentorships data
      // getWarningData()
      //   .then(({ data }) => {
      //     setIsLoading(false);
      //     setMentorships(data);
      //     console.log('🚀 ~ file: index.tsx ~ line 50 ~ .then ~ data', data);
      //   })
      //   .catch(() => {
      //     signOut({ callbackUrl: '/' });
      //   });
    }
  }, [loadingUser, session]);

  // useEffect(() => {}, []);

  return (
    <>
      <CustomHead title="Blacklist" />
      <DashboardLayout title="Blacklist">
        <div className="pt-10 pb-5 rounded-lg bg-cardContent">
          {' '}
          <div key={123} className="px-4 mb-5 sm:px-6">
            <div className="overflow-hidden border-2 border-gray-700 border-solid sm:rounded-lg">
              <div
                className="flex flex-row items-center justify-between px-2 py-3 cursor-pointer sm:px-6 text-mainTextColor hover:bg-cardHeader"
                onClick={(e: CardMouseEvent) => {
                  if (e.target.id !== 'warnButton') {
                    setIsOpen(!isOpen);
                  }
                }}
              >
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-200">
                    asdasd
                  </h3>
                  <p className="max-w-2xl mt-1 text-sm">asdasd</p>
                </div>
                <div className="flex flex-row items-center">
                  {true && (
                    <div className="has-tooltip">
                      <span className="px-2 py-1 -mt-8 -ml-10 text-sm text-red-500 bg-gray-700 rounded shadow-lg tooltip">
                        Advertir usuario
                      </span>
                      <ExclamationIcon
                        id="warnButton"
                        className="w-5 h-5 mx-2 text-red-400 cursor-pointer hover:text-red-600"
                        onClick={() => {}}
                      />
                    </div>
                  )}

                  <ChevronRightIcon
                    className={`w-5 h-5 transform transition-transform ${
                      isOpen ? 'rotate-90' : null
                    }`}
                  />
                </div>
              </div>
              <div
                className={` px-4 py-5 transition-all transform ease-in-out origin-top border-t border-gray-700 xm:px-6 ${
                  isOpen ? 'block' : 'hidden'
                }`}
              >
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-mainTextColor">
                      Discord ID - Usuario
                    </dt>
                    <dd className="mt-1 text-sm text-gray-200">asdasdsa</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-mainTextColor">
                      Email
                    </dt>
                    <dd className="mt-1 text-sm text-gray-200">asdas</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Warnings;
