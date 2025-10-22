import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./Routes";
import { Provider } from 'react-redux'
import store from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
