import DashboardLayout from '@/components/DashboardLayout';
import CustomHead from '@/components/CustomHead';
import GenericCard from '@/components/GenericCard';
import { useEffect, useCallback, useState, useMemo } from 'react';
import { getMetrics } from '@/services';
import type { Metrics } from '@/interfaces/metrics.interface';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTooltip } from 'victory';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import ChartYear from '@/components/ChartYear';
import ChartMonth from '@/components/ChartMonth';

const Indicator: React.FC<{ value?: number | string; label: string }> = ({
  label,
  value,
}) => (
  <div className="flex flex-col w-full px-2 space-y-2 text-center border-r last-of-type:border-0 border-fecGreen h-24">
    <p className="text-4xl">{value}</p>
    <p className="text-white text-opacity-60">{label}</p>
  </div>
);

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

  const fetchData = useCallback(async () => {
    try {
      const metrics = await getMetrics();

      console.log(metrics);

      setMetrics(metrics.data);
    } catch (err) {
      console.log(err);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-8">
            <GenericCard bodyClassnames="h-96 md:h-80 flex flex-col justify-between">
              <div>
                <h2 className="mb-4 text-xl font-medium text-mainTextColor">
                  Mentorias
                </h2>

                <div className="flex items-start w-full mb-4">
                  <Indicator
                    value={metrics?.mentorships_metrics.mentorshipsOfTheDay}
                    label="hoy"
                  />

                  <Indicator
                    value={metrics?.mentorships_metrics.mentorshipsOfTheWeek}
                    label="esta semana"
                  />

                  <Indicator
                    value={metrics?.mentorships_metrics.mentorshipsOfTheMonth}
                    label="este mes"
                  />

                  <Indicator
                    value={metrics?.mentorships_metrics.mentorshipsOfTheYear}
                    label="este año"
                  />
                </div>
              </div>
              <div className="grid items-center grid-cols-12">
                <p className="w-full col-span-8 mt-8 text-lg font-bold">
                  Mentorias totales{' '}
                  <span className="text-2xl">
                    {metrics?.mentorships_metrics.mentorshipsTotal}
                  </span>
                </p>

                <ChartYear data={mentorships} />
              </div>
            </GenericCard>

            <GenericCard bodyClassnames="h-96 md:h-80">
              <h2 className="mb-4 text-xl font-medium text-mainTextColor">
                Mentorias mensuales
              </h2>

              <ChartMonth data={mentorships} />
            </GenericCard>
          </div>

          <GenericCard bodyClassnames="h-40">
            <h2 className="mb-4 text-xl font-medium text-mainTextColor">
              Mentores
            </h2>

            <div className="flex items-center w-full">
              <Indicator value={metrics?.mentors.total} label="Totales" />

              <Indicator value={metrics?.mentors.active} label="Activos" />
            </div>
          </GenericCard>

          <div>
            <div className="flex flex-col space-y-8">
              <GenericCard bodyClassnames="h-96 md:h-80 flex flex-col justify-between">
                <div>
                  <h2 className="mb-4 text-xl font-medium text-mainTextColor">
                    Penalizaciones
                  </h2>

                  <div className="flex items-center w-full">
                    <Indicator
                      value={metrics?.warnings_metrics.warningsOfTheDay}
                      label="hoy"
                    />

                    <Indicator
                      value={metrics?.warnings_metrics.warningsOfTheWeek}
                      label="esta semana"
                    />

                    <Indicator
                      value={metrics?.warnings_metrics.warningsOfTheMonth}
                      label="este mes"
                    />

                    <Indicator
                      value={metrics?.warnings_metrics.warningsOfTheYear}
                      label="este año"
                    />
                  </div>
                </div>
                <div className="grid items-center grid-cols-12">
                  <p className="w-full col-span-8 mt-8 text-lg font-bold">
                    Penalizaciones totales{' '}
                    <span className="text-2xl">
                      {metrics?.warnings_metrics.warningsTotal}
                    </span>
                  </p>

                  <ChartYear data={warnings} />
                </div>
              </GenericCard>

              <GenericCard>
                <h2 className="h-96 md:h-80 mb-4 text-xl font-medium text-mainTextColor">
                  Penalizaciones mensuales
                </h2>

                <div className="w-full">
                  {warnings?.months && (
                    <VictoryChart>
                      <VictoryAxis
                        crossAxis
                        fixLabelOverlap
                        style={{
                          tickLabels: {
                            fontFamily: 'sans-serif',
                            fill: '#fff',
                          },
                        }}
                      />
                      <VictoryBar
                        labelComponent={<VictoryTooltip />}
                        style={{
                          data: {
                            fill: 'rgb(153 246 228)',
                          },
                        }}
                        barRatio={1}
                        data={warnings.months}
                        x="monthLabel"
                        labels={({ datum }) => datum.count}
                        y="count"
                      />
                    </VictoryChart>
                  )}
                </div>
              </GenericCard>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Home;
