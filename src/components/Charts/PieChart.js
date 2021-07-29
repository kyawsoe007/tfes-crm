import React from "react";
import { Pie } from "react-chartjs-2";
import { PastelOne9 } from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.brewer";

export default function GroupedBarChart(props) {
  const { labels, data, ...others } = props;

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: PastelOne9
      }
    ]
  };

  return <Pie data={chartData} {...others} />;
}
