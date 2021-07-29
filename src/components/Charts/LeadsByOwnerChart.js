import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import ChartConfig from "Constants/chart-config";
import { Table } from "reactstrap";

function LeadsByOwnerChart(props) {
  const labels = props.data.map(label => label.name);
  const data = props.data.map(dat => dat.totalLeads);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Number of Leads",
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
                <th>Owner</th>
                <th>Lead Name</th>
                <th>Company Name</th>
                <th>Status</th>
                <th>Source</th>
                <th>Interest</th>
              </tr>
            </thead>
            <tbody>
              {props.data.map(user =>
                user.leads.map((lead, key) => (
                  <tr key={key}>
                    {key == 0 && (
                      <td rowSpan={user.totalLeads}>
                        <strong>{`${user.name} (${user.totalLeads})`}</strong>
                      </td>
                    )}
                    <td>{lead.name}</td>
                    <td>{lead.companyName}</td>
                    <td>{lead.status}</td>
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

export default LeadsByOwnerChart;
