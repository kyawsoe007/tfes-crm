import React from "react";
import { Doughnut } from "react-chartjs-2";
import { PastelOne9 } from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.brewer";

function DonutChart(props) {
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
  return <Doughnut data={chartData} {...others} />;
}

export default DonutChart;
