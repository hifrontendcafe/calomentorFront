import CustomHead from '@/components/CustomHead';
import PwdByVercel from '@/components/PwdByVercel';

const Unauthorized: React.FC = () => {
  return (
    <>
      <CustomHead title="Unauthorized" />
      <div className="flex flex-col justify-center min-h-screen py-12 bg-mainContent sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="px-0 py-16 shadow-xl bg-cardContent sm:rounded-2xl">
            <div className="w-full max-w-sm space-y-8">
              <div className="flex flex-col align-center">
                <span className="text-center text-7xl animate-pulse">🔥</span>
                <h2 className="mt-3 text-3xl font-semibold text-center text-gray-200">
                  Calomentor
                </h2>
              </div>
              <div className="flex items-center justify-center">
                <p className="text-xl text-gray-200">
                  No tienes permisos para iniciar sesión.
                </p>
              </div>
            </div>
          </div>
        </div>
        <PwdByVercel />
      </div>
    </>
  );
};

export default Unauthorized;
