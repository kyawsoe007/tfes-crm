import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Table } from "reactstrap";
import NumberFormat from "react-number-format";
import { getTheDate } from "Helpers/helpers";

function DealsByTypeChart(props) {
  const labels = props.data.map(dat => dat.name);
  const data = props.data.map(dat => dat.totalDeals);
  const backgroundColor = props.data.map(dat => dat.color);

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor
      }
    ]
  };
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12 align-self-center">
          <Doughnut height={70} data={chartData} />
        </div>
      </div>
      <div className="row mt-30">
        <div className="col-12">
          <Table size="sm">
            <thead>
              <tr>
                <th>Type</th>
                <th>Deal Name</th>
                <th>Closed On</th>
                <th>Owner</th>
                <th>Stage</th>
                <th>Chance</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {props.data.map((type, k) => (
                <React.Fragment key={k}>
                  {type.deals.map((deal, key) => (
                    <tr key={key}>
                      {key == 0 && (
                        <td rowSpan={type.totalDeals}>
                          <strong>{`${type.name} ( ${type.totalDeals} deal )`}</strong>
                        </td>
                      )}
                      <td>{deal.name}</td>
                      <td>
                        {deal.closingDate && getTheDate(deal.closingDate)}
                      </td>
                      <td>{deal.userInfo}</td>
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
                  {type.deals.length > 0 && (
                    <tr>
                      <td colSpan={6} className="text-right pr-20">
                        <strong>Total Amount</strong>
                      </td>
                      <td>
                        <strong>
                          <NumberFormat
                            value={type.totalAmount}
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
export default DealsByTypeChart;
