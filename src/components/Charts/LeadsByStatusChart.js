import React from "react";
import { Pie } from "react-chartjs-2";
import { Table } from "reactstrap";

function LeadsByStatusChart(props) {
  const labels = props.data.map(label => label.name);
  const data = props.data.map(dat => dat.totalLeads);
  const backgroundColor = props.data.map(color => color.color);

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
        <div className="col-12">
          <Pie data={chartData} height={70} />
        </div>
      </div>
      <div className="row mt-30">
        <div className="col-12">
          <Table size="sm">
            <thead>
              <tr>
                <th>Status</th>
                <th>Lead Name</th>
                <th>Company Name</th>
                <th>Owner</th>
                <th>Source</th>
                <th>Interest</th>
              </tr>
            </thead>
            <tbody>
              {props.data.map(status =>
                status.leads.map((lead, key) => (
                  <tr key={key}>
                    {key == 0 && (
                      <td rowSpan={status.totalLeads}>
                        <strong>{`${status.name} (${
                          status.totalLeads
                        })`}</strong>
                      </td>
                    )}
                    <td>{lead.name}</td>
                    <td>{lead.companyName}</td>
                    <td>{lead.userInfo}</td>
                    <td>{lead.source}</td>
                    <td>{lead.interest}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LeadsByStatusChart;
