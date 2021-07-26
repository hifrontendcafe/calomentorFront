import Image from "next/image";
import DiscordLogo from "../assets/img/Discord-Logo-White.svg";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="bg-white py-16 px-0 shadow sm:rounded-lg">
          <div className="max-w-sm w-full space-y-8">
            <div className="flex align-center flex-col">
              <span className="text-7xl text-center">🔥</span>
              <h2 className="mt-3 text-center text-3xl font-semibold text-gray-900">
                Calomentor
              </h2>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="flex justify-center group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                <Image
                  className=""
                  src={DiscordLogo}
                  alt="Discord logo"
                  width="30"
                  height="30"
                />
                <p className="flex my-auto pl-2 text-xl font-semibold">
                  Iniciar sesión
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
