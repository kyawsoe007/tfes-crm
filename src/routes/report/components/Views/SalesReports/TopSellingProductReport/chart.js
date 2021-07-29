import React from "react";
import BarChart from "Components/Charts/BarChart";
import { Table } from "reactstrap";
import NumberFormat from "react-number-format";
import { getTheDate } from "Helpers/helpers";

export default function TopSellingProductChart(props) {
  const labels = props.data.map(dat => dat.name);
  const chartData = props.data.map(dat => dat.count);

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12 align-self-center">
          <BarChart data={chartData} chartLegend="Total Sold" labels={labels} />
        </div>
      </div>
      <div className="row mt-30">
        <div className="col-12">
          <Table size="sm">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Sold On</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {props.data.map((grade, k) => (
                <React.Fragment key={k}>
                  {grade.productSold.map((product, key) => (
                    <tr key={key}>
                      {key == 0 && (
                        <td rowSpan={grade.count}>
                          <strong>{`${grade.name} ( ${grade.count} sold )`}</strong>
                        </td>
                      )}
                      <td>{product.paidOn && getTheDate(product.paidOn)}</td>
                      <td>
                        <NumberFormat
                          value={product.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      </td>
                    </tr>
                  ))}
                  {grade.productSold.length > 0 && (
                    <tr>
                      <td colSpan={2} className="text-right pr-20">
                        <strong>Total Amount</strong>
                      </td>
                      <td>
                        <strong>
                          <NumberFormat
                            value={grade.totalAmount}
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
