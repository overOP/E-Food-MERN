import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./Routes";
import { Provider } from 'react-redux'
import store from "./store/store";
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <Provider store={store}>
      <Toaster />
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
