import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import ChartConfig from "Constants/chart-config";
import { Table } from "reactstrap";
import NumberFormat from "react-number-format";
import { getTheDate } from "Helpers/helpers";

function DealsPipelineChart(props) {
  const labels = props.data.map(dat => dat.name);
  const data = props.data.map(dat => dat.totalAmount);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Amount",
        backgroundColor: ChartConfig.color.primary,
        data
      }
    ]
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
          <HorizontalBar data={chartData} height={80} />
        </div>
      </div>
      <div className="row mt-30">
        <div className="col-12">
          <Table size="sm">
            <thead>
              <tr>
                <th>Stage</th>
                <th>Deal Name</th>
                <th>Closed On</th>
                <th>Owner</th>
                <th>Type</th>
                <th>Source</th>
                <th>Chance</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {props.data.map((stage, k) => (
                <React.Fragment key={k}>
                  {stage.deals.map((deal, key) => (
                    <tr key={key}>
                      {key == 0 && (
                        <td rowSpan={stage.totalDeals}>
                          <strong>{`${stage.name} ( ${stage.totalDeals} deal )`}</strong>
                        </td>
                      )}
                      <td>{deal.name}</td>
                      <td>
                        {deal.closingDate && getTheDate(deal.closingDate)}
                      </td>
                      <td>{deal.userInfo}</td>
                      <td>{deal.type}</td>
                      <td>{deal.source}</td>
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
                  {stage.deals.length > 0 && (
                    <tr>
                      <td colSpan={7} className="text-right pr-20">
                        <strong>Total Amount</strong>
                      </td>
                      <td>
                        <strong>
                          <NumberFormat
                            value={stage.totalAmount}
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

export default DealsPipelineChart;
