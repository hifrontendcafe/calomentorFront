import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import { HOME } from '@/config/Routes';
import CustomHead from '@/components/CustomHead';
import PwdByVercel from '@/components/PwdByVercel';
import { FaDiscord } from 'react-icons/fa';
import { useNextAuthSession } from '@/hooks/useNextAuthSession';
import { signIn } from 'next-auth/react';

const Home = () => {
  const [session, loading] = useNextAuthSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push(HOME);
    }
  }, [router, session]);

  return (
    <>
      <CustomHead title="Login" />
      <div className="flex flex-col justify-center min-h-screen py-12 bg-mainContent sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="px-0 py-16 shadow-xl bg-cardContent sm:rounded-2xl">
            <div className="w-full max-w-sm space-y-8">
              {!session && loading ? (
                <div className="flex items-center justify-center ">
                  <div className="w-24 h-24 border-t-4 border-b-4 rounded-full border-fecGreen animate-spin" />
                </div>
              ) : (
                <>
                  <div className="flex flex-col align-center">
                    <span className="text-center text-7xl animate-pulse">
                      🔥
                    </span>
                    <h2 className="mt-3 text-3xl font-semibold text-center text-gray-200">
                      Calomentor
                    </h2>
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={() =>
                        signIn('discord', {
                          callbackUrl: `${window.location.origin}${HOME}`,
                        })
                      }
                      className="relative flex items-center justify-center px-4 py-2 text-xs font-medium text-white border border-transparent rounded-md bg-activeNavigation group hover:bg-hoverNavigation focus:outline-none"
                    >
                      <FaDiscord size={20} />
                      <p className="flex pl-2 my-auto text-sm font-semibold">
                        Iniciar sesión
                      </p>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <PwdByVercel />
      </div>
    </>
  );
};

export default Home;
