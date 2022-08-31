import React from 'react';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryTooltip,
} from 'victory';

const ChartMonth = ({ data }: { data: any }) => {
  return (
    <div className="w-full">
      {data?.months && (
        <VictoryChart>
          <VictoryAxis
            crossAxis
            fixLabelOverlap
            style={{
              tickLabels: {
                fontFamily: 'sans-serif',
                fill: '#fff',
                textTransform: 'capitalize',
              },
            }}
          />
          <VictoryBar
            labelComponent={<VictoryLabel dy={25} />}
            style={{
              data: {
                fill: 'rgb(153 246 228)',
              },
              labels: {
                fontWeight: 600,
              },
            }}
            events={[
              {
                eventHandlers: {
                  onMouseEnter: () => ({
                    mutation: () => ({
                      style: {
                        fill: '#14B8A6',
                      },
                    }),
                  }),
                  onMouseLeave: () => ({
                    mutation: () => ({
                      style: {
                        fill: 'rgb(153 246 228)',
                      },
                    }),
                  }),
                },
                target: 'data',
              },
            ]}
            barRatio={1}
            data={data.months}
            x="monthLabel"
            labels={({ datum }) => datum.count}
            y="count"
          />
        </VictoryChart>
      )}
    </div>
  );
};

export default ChartMonth;
