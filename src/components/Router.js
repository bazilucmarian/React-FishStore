import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Store from "../Store";
import App from "./App";
import NotFound from "./NotFound";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Store}></Route>
      <Route exact path="/store/:storeId" component={App}></Route>
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);
export default Router;
