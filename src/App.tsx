import Router from "./routes";

import { UserNameProvider } from "./context/usernameContext";

import "./global.scss";

import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.min.css";

function App() {
  return (
    <UserNameProvider>
      <Router />
    </UserNameProvider>
  );
}

export default App;
