import React from "react";
import { Line } from "react-chartjs-2";
import ChartConfig from "Constants/chart-config";

const options = {
  fill: false,
  responsive: "scrollMaxHeight",
  scales: {
    xAxes: [
      {
        type: "time",
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Date"
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        },
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Deal Amount ($)"
        }
      }
    ]
  }
};

function PeriodSalesChart(props) {
  const labels = props.data.map(label => label.date);
  const data = props.data.map(dat => dat.amount);
  labels.push(props.startDate, props.endDate);
  const chartData = {
    // Labels should be Date objects
    labels,
    datasets: [
      {
        fill: false,
        label: "Amount",
        data,
        borderColor: ChartConfig.color.info,
        lineTension: 0
      }
    ]
  };

  return (
    <div className="p-10">
      <h4>Sales Chart in Set Period</h4>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default PeriodSalesChart;
