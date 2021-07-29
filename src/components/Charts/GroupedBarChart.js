import React from "react";
import { Bar } from "react-chartjs-2";
import { PastelOne9 } from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.brewer";

export default function GroupedBarChart(props) {
  const { labels, data, ...others } = props;
  const options = {
    responsive: true,
    type: "bar"
  };

  const datasets = data.map((dat, key) => ({
    label: dat.name,
    backgroundColor: PastelOne9[key],
    ...dat
  }));

  const chartData = {
    labels,
    datasets
  };
  return <Bar data={chartData} options={options} {...others} />;
}
