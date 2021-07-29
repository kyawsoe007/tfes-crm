import React from "react";
import Loadable from "react-loadable";

// rct page loader
import RctPageLoader from "Components/RctPageLoader";

/**
 * Login
 */
export const LoginComponent = Loadable({
  loader: () => import("./login"),
  loading: () => <RctPageLoader />
});

/**
 * Forget Password
 */
export const ForgetPasswordComponent = Loadable({
  loader: () => import("./forgetPassword"),
  loading: () => <RctPageLoader />
});

/**
 * Register Component
 */
// export const RegisterComponent = Loadable({
//   loader: () => import("./register"),
//   loading: () => <RctPageLoader />
// });
