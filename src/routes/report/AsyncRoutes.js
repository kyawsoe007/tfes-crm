import React from "react";
import Loadable from "react-loadable";

// rct page loader
import RctPageLoader from "Components/RctPageLoader";

// report
const ReportComponent = Loadable({
  loader: () => import("./index"),
  loading: () => <RctPageLoader />
});

export default ReportComponent;
