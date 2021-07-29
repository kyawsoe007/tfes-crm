import React from "react";
import PieChart from "Components/Charts/PieChart";
import BarChart from "Components/Charts/BarChart";
import { Table } from "reactstrap";
import NumberFormat from "react-number-format";
import { getTheDate } from "Helpers/helpers";

export default function CommissionReportChart(props) {
  const labels = props.data.map(dat => dat.name);
  const closedDealData = props.data.map(dat => dat.dealsCount);
  const commsData = props.data.map(dat => dat.totalComms);

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-6 align-self-center">
          <h3>Commission Amount</h3>
          <BarChart
            data={commsData}
            chartLegend="Comms Earned"
            labels={labels}
          />
        </div>
        <div className="col-6 align-self-center">
          <h3>No. of Closed Deals</h3>
          <PieChart data={closedDealData} labels={labels} />
        </div>
      </div>
      <div className="row mt-30">
        <div className="col-12">
          <Table size="sm">
            <thead>
              <tr>
                <th>Agent Name</th>
                <th>Deal Name</th>
                <th>Closed On</th>
                <th>Related Customer</th>
                <th>Amount</th>
                <th>Commission</th>
              </tr>
            </thead>
            <tbody>
              {props.data.map((agent, k) => (
                <React.Fragment key={k}>
                  {agent.dealsClosed.map((deal, key) => (
                    <tr key={key}>
                      {key == 0 && (
                        <td rowSpan={agent.dealsCount}>
                          <strong>{`${agent.name} ( ${agent.dealsCount} deal(s) )`}</strong>
                        </td>
                      )}
                      <td>{deal.name}</td>

                      <td>
                        {deal.closingDate && getTheDate(deal.closingDate)}
                      </td>
                      <td>{deal.customerInfo && deal.customerInfo.name}</td>
                      <td>
                        <NumberFormat
                          value={deal.amount}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      </td>
                      <td>
                        <NumberFormat
                          value={deal.commissionEarned}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      </td>
                    </tr>
                  ))}
                  {agent.dealsClosed.length > 0 && (
                    <tr>
                      <td colSpan={5} className="text-right pr-20">
                        <strong>Total Commission</strong>
                      </td>
                      <td>
                        <strong>
                          <NumberFormat
                            value={agent.totalComms}
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

/*  */
