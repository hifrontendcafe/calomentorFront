import DashboardLayout from '@/components/DashboardLayout';
import CustomHead from '@/components/CustomHead';
import InfoCard from '@/components/InfoCard';
import { useEffect, useCallback, useState, useMemo } from 'react';
import { getMetrics } from '@/services';
import type { Metrics } from '@/interfaces/metrics.interface';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

import Spinner from '@/components/Spinner';

function getDateData<T extends object>(collection: T[], dateKey: keyof T) {
  const months: Record<number, number> = {};
  const years: Record<number, number> = {};

  const today = dayjs();

  const dataForMonth = collection.filter(item =>
    dayjs(+item[dateKey]).isSame(today, 'year'),
  );

  collection.forEach(item => {
    const year = dayjs(+item[dateKey]).year();

    if (!years[year]) {
      years[year] = 1;
    } else {
      years[year] += 1;
    }
  }, []);

  dataForMonth.forEach(item => {
    const month = dayjs(+item[dateKey]).month();

    if (!months[month]) {
      months[month] = 1;
    } else {
      months[month] += 1;
    }
  });

  const monthsData = Object.keys(months).map(month => ({
    month,
    count: months[+month],
    monthLabel: dayjs()
      .month(+month)
      .locale('es')
      .format('MMMM'),
  }));

  const yearsData = Object.keys(years).map(year => ({
    year,
    count: years[+year],
  }));

  const sortedMonths = monthsData.sort((a, b) => +a.month - +b.month);

  const sortedYears = yearsData.sort((a, b) => +a.year - +b.year);

  return {
    months: sortedMonths,
    years: sortedYears,
  };
}

const Home: React.FC = () => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const metrics = await getMetrics();
      setMetrics(metrics.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  }, []);

  const mentorships = useMemo(() => {
    if (!metrics) return null;

    return getDateData(
      metrics.mentorships_metrics.all_mentorships,
      'mentorship_create_date',
    );
  }, [metrics]);

  const warnings = useMemo(() => {
    if (!metrics) return null;

    return getDateData(metrics.warnings_metrics.all_warnings, 'warning_date');
  }, [metrics]);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }

    fetchData();
  }, [mounted, fetchData]);

  return (
    <div className="text-white">
      <CustomHead title="Inicio" />
      <DashboardLayout>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InfoCard
              data={mentorships}
              label={'Mentorias'}
              dataOfTheDay={metrics?.mentorships_metrics?.mentorshipsOfTheDay!}
              dataOfTheMonth={
                metrics?.mentorships_metrics?.mentorshipsOfTheMonth!
              }
              dataOfTheYear={
                metrics?.mentorships_metrics?.mentorshipsOfTheYear!
              }
              dataOfTheWeek={
                metrics?.mentorships_metrics?.mentorshipsOfTheWeek!
              }
              total={metrics?.mentorships_metrics?.mentorshipsTotal!}
            />

            <InfoCard
              data={warnings}
              label={'Penalizaciones'}
              dataOfTheDay={metrics?.warnings_metrics?.warningsOfTheDay!}
              dataOfTheMonth={metrics?.warnings_metrics?.warningsOfTheMonth!}
              dataOfTheYear={metrics?.warnings_metrics?.warningsOfTheYear!}
              dataOfTheWeek={metrics?.warnings_metrics?.warningsOfTheWeek!}
              total={metrics?.warnings_metrics?.warningsTotal!}
            />
          </div>
        )}
      </DashboardLayout>
    </div>
  );
};

export default Home;
