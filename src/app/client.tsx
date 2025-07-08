import { createBrowserHistory } from "history";
import React from "react";
import { createRoot } from "react-dom/client";
import { Router } from "react-router-dom";
import { store } from "src/redux/store";

import { Provider } from "react-redux";
import { OrderPage } from "../pages/OrderPage";

const container = document.getElementById("app") as Element;
const root = createRoot(container);
const history = createBrowserHistory();

root.render(
  <Provider store={store}>
    <Router history={history as any}>
      <React.Suspense>
        <OrderPage />
      </React.Suspense>
    </Router>
  </Provider>,
);
