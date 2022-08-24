import React from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel } from 'victory';

const Chart = ({ data }: { data: any }) => {
  return (
    <div className="col-span-4">
      {data?.years && (
        <VictoryChart>
          <VictoryAxis
            crossAxis
            fixLabelOverlap
            style={{
              tickLabels: {
                fontFamily: 'sans-serif',
                fill: '#fff',
                fontWeight: 600,
                fontSize: 30,
              },
              axis: {
                display: 'none',
              },
            }}
          />
          <VictoryBar
            labelComponent={<VictoryLabel dy={50} />}
            style={{
              data: {
                fill: 'rgb(153 246 228)',
              },
              labels: {
                fontSize: 30,
                fontWeight: 600,
              },
            }}
            domain={{ x: [0, data.years.length] }}
            alignment="middle"
            data={data.years}
            barWidth={100}
            x="year"
            labels={({ datum }) => datum.count}
            y="count"
          />
        </VictoryChart>
      )}
    </div>
  );
};

export default Chart;
