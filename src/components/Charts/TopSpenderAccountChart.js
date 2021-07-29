import React from "react";
import { Bar } from "react-chartjs-2";
import ChartConfig from "Constants/chart-config";
import { Table } from "reactstrap";
import NumberFormat from "react-number-format";
import { getTheDate } from "Helpers/helpers";

function TopSpenderAccountChart(props) {
  const labels = props.data.map(label => label.name);
  const data = props.data.map(dat => dat.totalSpent);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Spent",
        backgroundColor: ChartConfig.color.info,
        data
      }
    ]
  };
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
          <Bar
            data={chartData}
            height={50}
            options={{
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      min: 0
                    }
                  }
                ]
              }
            }}
          />
        </div>
      </div>
      <div className="row mt-30">
        <div className="col-12">
          <Table size="sm">
            <thead>
              <tr>
                <th>Account Name</th>
                <th>Deal Name</th>
                <th>Stage</th>
                <th>Closed On</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {props.data.map((acct, i) => (
                <React.Fragment key={i}>
                  {acct.deals.map((deal, key) => (
                    <tr key={key}>
                      {key == 0 && (
                        <td rowSpan={acct.deals.length}>
                          <strong>
                            {`${acct.name} ( ${acct.deals.length} deal )`}
                          </strong>
                        </td>
                      )}
                      <td>{deal.name}</td>
                      <td>{deal.stage}</td>
                      <td>
                        {deal.closingDate && getTheDate(deal.closingDate)}
                      </td>
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
                  <tr>
                    <td colSpan={5} className="text-right pr-20">
                      <strong>Total Spent</strong>
                    </td>
                    <td>
                      <strong>
                        <NumberFormat
                          value={acct.totalSpent}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      </strong>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default TopSpenderAccountChart;
