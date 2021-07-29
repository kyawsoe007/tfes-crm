import React from "react";
import { Bar } from "react-chartjs-2";
import { PastelOne9 } from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.brewer";

export default function GroupedBarChart(props) {
  const { labels, data, chartLegend, ...others } = props;
  const options = {
    responsive: true,
    type: "bar"
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: chartLegend,
        backgroundColor: PastelOne9,
        data
      }
    ]
  };
  return <Bar data={chartData} options={options} {...others} />;
}
