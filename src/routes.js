import React from "react";

const Forms = React.lazy(() => import("./views/Base/Forms"));
const Dashboard = React.lazy(() => import("./views/Dashboard"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/base/forms/:index?/:edit?", name: "Forms", component: Forms }
];

export default routes;
