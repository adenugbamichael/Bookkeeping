import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Records from "./components/Records";

const App = () => {
  return (
    <>
      <Header />
      <Records />;
      <ToastContainer />
    </>
  );
};

export default App;
