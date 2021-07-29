import React, { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

export default function RecordsList(props) {
  const { title, columns, data, options, style, borderRadius, boxShadow } = props;

  let myTheme = createMuiTheme({
    overrides: {
      MUIDataTable: {
        responsiveScroll: {
          maxHeight: "auto"
        }
      },
      MuiPaper: {
        rounded: { borderRadius: borderRadius? borderRadius : "15px" },
        elevation4: { boxShadow: boxShadow? boxShadow : '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)' }
      },
      MuiTableCell: {
        root: { fontFamily: "Lato", borderBottom: "none" },
        head: { color: "#fff"},
      
      },
      MUIDataTableHeadCell: {
        fixedHeaderCommon: { backgroundColor: "#254065"}
      },
      MuiTypography: {
        root: {
          fontFamily: "Lato!important"
        },
        h6: { fontSize: "1rem" }
      },
      MUIDataTableBodyRow: {
        root: {
          "&:nth-child(odd)": {
            backgroundColor: "#f8f8f8a1",
          }
        }
      },
  
    }
  });

  return (
    <MuiThemeProvider theme={myTheme}>
      <MUIDataTable
        title={title}
        columns={columns}
        data={data}
        options={options}  
      />
    </MuiThemeProvider>
  );
}
