import Image from "next/image";
import DiscordLogo from "@/assets/img/Discord-Logo-White.svg";
import PwdByVercel from "@/assets/img/powered-by-vercel.svg";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { HOME } from "@/config/Routes";
import CustomHead from "@/components/CustomHead";

const Home = () => {
  const [session, loading] = useSession();
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
                        signIn("discord", {
                          callbackUrl: `${window.location.origin}${HOME}`,
                        })
                      }
                      className="relative flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md bg-activeNavigation group hover:bg-hoverNavigation focus:outline-none"
                    >
                      <Image
                        src={DiscordLogo}
                        alt="Discord logo"
                        width="30"
                        height="28"
                      />
                      <p className="flex pl-2 my-auto text-xl font-semibold">
                        Iniciar sesión
                      </p>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 self-center mb-4">
          <a href="https://vercel.com/?utm_source=hifrontendcafe&utm_campaign=oss">
            <Image
              src={PwdByVercel}
              height="40"
              width="206"
              alt="Powered by Vercel"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default Home;
