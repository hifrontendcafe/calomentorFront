import DashboardLayout from '@/components/DashboardLayout';
import CustomHead from '@/components/CustomHead';
import { SCHEDULE } from '@/config/Routes';
import Link from 'next/link';
import GenericCard from '@/components/GenericCard';

const Home: React.FC = () => {
  return (
    <>
      <CustomHead title="Inicio" />
      <DashboardLayout title="Inicio">
        <GenericCard
          title="Próximamente Estadisticas"
          isDataEmpty={false}
          isLoading={false}
          noDataMessage={
            <span>
              Actualmente no posees mentorías agendadas, recuerda configurar tus{' '}
              <Link href={SCHEDULE}>
                <a className="underline">horarios disponibles.</a>
              </Link>
            </span>
          }
        >
        </GenericCard>
      </DashboardLayout>
    </>
  );
};

export default Home;
