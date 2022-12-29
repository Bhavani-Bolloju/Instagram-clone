import React, { Suspense } from "react";

import { lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import "../src/styles/app.css";

import useAuthListener from "./hooks/use-auth";
import AuthContext from "./context/authContext";

const LoginPage = lazy(() => import("./pages/LoginPage.js"));
const SignupPage = lazy(() => import("./pages/Signup"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  const { user } = useAuthListener();

  return (
    <Suspense fallback={<p>loading...</p>}>
      <AuthContext.Provider value={{ user }}>
        <Switch>
          <Route path={ROUTES.LOGIN}>
            {!user && <LoginPage />}
            {user && <Redirect to={ROUTES.DASHBOARD} />}
          </Route>
          <Route path={ROUTES.SIGN_UP}>
            {!user && <SignupPage />}
            {user && <Redirect to={ROUTES.DASHBOARD} />}
          </Route>
          <Route path={ROUTES.DASHBOARD} exact>
            {user && <DashboardPage />}
            {!user && <Redirect to={ROUTES.LOGIN} />}
          </Route>
          <Route path={ROUTES.PROFILE}>{user && <Profile />}</Route>
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </AuthContext.Provider>
    </Suspense>
  );
}

export default App;
