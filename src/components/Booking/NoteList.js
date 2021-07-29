import React from "react";

import RecordsList from "Components/RecordsList";
import { listOptions } from "Helpers/helpers";
import RctSectionLoader from "Components/RctSectionLoader";

import Moment from 'moment'

const NoteList = ({ tableData, loading, title, }) => {
    
    const columns = [
        {
            label: "Description",
            name: "content",
            options: {
                customBodyRender: (value, tableMeta) => {
                    return (
                        <span style={{color:"rgba(0,0,0,0.7)"}}>{value}</span>
                    );
                }
            }
        },
        {
            label: "Created On",
            name: "createdAt",
            options: {
                customBodyRender: (value, tableMeta) => {
                    return (
                        <span style={{color:"rgba(0,0,0,0.7)"}}>{Moment(value).format('LLL')}</span>
                    );
                }
            }
        },
    ];

    const listOptions = {
        filterType: "dropdown",
        responsive: "stacked",
        selectableRows: 'none',
        expandableRows: false, // Try Adding This
        print: false,
        download: false,
        viewColumns: false,
        search: false,
        filter: false,
    }


  return (

      <div className="rct-block" style={{borderRadius:10, boxShadow: '0 5px 9px 0 rgba(0,0,0,0.15), 0 8px 25px 0 rgba(0,0,0,0.15)', flex:1, overflow:'auto'}}>
        <RecordsList
            title={title}
            columns={columns}
            data={tableData} 
            options={listOptions}
        />
      </div>
    
  );
};

export default NoteList;

