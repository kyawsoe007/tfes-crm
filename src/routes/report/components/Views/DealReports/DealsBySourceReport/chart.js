import React from "react";
import GroupedBarChart from "Components/Charts/GroupedBarChart";
import { Table } from "reactstrap";
import NumberFormat from "react-number-format";
import { getTheDate } from "Helpers/helpers";

export default function DealsBySourceChart(props) {
  const labels = props.data.map(dat => dat.name);

  const setOne = {
    name: "Customers",
    data: props.data.map(dat => dat.totalCusts)
  };
  const setTwo = {
    name: "Deals",
    data: props.data.map(dat => dat.totalDeals)
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12 align-self-center">
          <GroupedBarChart data={[setOne, setTwo]} labels={labels} />
        </div>
      </div>
      <div className="row mt-30">
        <div className="col-12">
          <h3>Source by Deals</h3>
          <Table size="sm">
            <thead>
              <tr>
                <th>Source</th>
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
      <div className="row mt-30">
        <div className="col-12">
          <h3>Source by Customers</h3>
          <Table size="sm">
            <thead>
              <tr>
                <th>Source</th>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {props.data.map((type, k) => (
                <React.Fragment key={k}>
                  {type.customers.map((deal, key) => (
                    <tr key={key}>
                      {key == 0 && (
                        <td rowSpan={type.totalCusts}>
                          <strong>{`${type.name} ( ${type.totalCusts} customer )`}</strong>
                        </td>
                      )}
                      <td>{deal.name}</td>
                      <td>{deal.email}</td>
                      <td>{deal.userInfo}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </React.Fragment>
  );
}
