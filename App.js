import { Provider } from "react-redux";
import AppWrapper from "./AppWrapper";
import store from "./src/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
}

