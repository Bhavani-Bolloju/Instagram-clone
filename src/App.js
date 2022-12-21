import React, { Suspense } from "react";

import { lazy } from "react";
import { Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import "../src/styles/app.css";

import useAuthListener from "./hooks/use-auth";
import AuthContext from "./context/authContext";

const LoginPage = lazy(() => import("./pages/LoginPage.js"));
const SignupPage = lazy(() => import("./pages/Signup"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));

function App() {
  const { user } = useAuthListener();

  return (
    <Suspense fallback={<p>loading...</p>}>
      <AuthContext.Provider value={{ user }}>
        <Switch>
          {/* <Route path={ROUTES.DASHBOARD} component={LoginPage} /> */}
          <Route path={ROUTES.LOGIN} component={LoginPage} />
          <Route path={ROUTES.SIGN_UP} component={SignupPage} />
          <Route path={ROUTES.DASHBOARD} component={DashboardPage} exact />
          {/* <Route path={ROUTES.PROFILE} component={Profile} />
        <Route path={ROUTES.SIGN_UP} component={Signup} />
        <Route path={ROUTES.NOT_FOUND} component={Notfound}></Route> */}
          {/* <Route path="/login" element={Login} /> */}
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </AuthContext.Provider>
    </Suspense>
  );
}

export default App;
