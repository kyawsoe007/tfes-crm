import React from "react";
import { Bar } from "react-chartjs-2";
import ChartConfig from "Constants/chart-config";
import { Table } from "reactstrap";
import NumberFormat from "react-number-format";
import { getTheDate } from "Helpers/helpers";

function DealsByOwnerChart(props) {
  // mapping props
  const labels = props.data.map(d => d.name);
  const data = props.data.map(d => d.totalDeals);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Deals Owned",
        backgroundColor: ChartConfig.color.info,
        data
      }
    ]
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            fontColor: ChartConfig.axesColor,
            beginAtZero: true,
            min: 0
          }
        }
      ]
    }
  };
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
          <Bar data={chartData} height={80} options={options} />
        </div>
      </div>
      <div className="row mt-30">
        <div className="col-12">
          <Table size="sm">
            <thead>
              <tr>
                <th>Owner</th>
                <th>Deal Name</th>
                <th>Closed On</th>
                <th>Stage</th>
                <th>Chance</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {props.data.map((owner, i) => (
                <React.Fragment key={i}>
                  {owner.deals.map((deal, key) => (
                    <tr key={key}>
                      {key == 0 && (
                        <td rowSpan={owner.totalDeals}>
                          <strong>{`${owner.name} ( ${owner.totalDeals} deal )`}</strong>
                        </td>
                      )}
                      <td>{deal.name}</td>
                      <td>
                        {deal.closingDate && getTheDate(deal.closingDate)}
                      </td>
                      <td>{deal.stage}</td>
                      <td>{deal.chance}</td>
                      <td>
                        <NumberFormat
                          value={deal.amount}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      </td>
                    </tr>
                  ))}
                  {owner.deals.length > 0 && (
                    <tr>
                      <td colSpan={5} className="text-right pr-20">
                        <strong>Total Amount</strong>
                      </td>
                      <td>
                        <strong>
                          <NumberFormat
                            value={owner.totalAmount}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                          />
                        </strong>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default DealsByOwnerChart;
