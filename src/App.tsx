import "./App.css";
import { Router } from "./routers/Router";
import { Navbar } from "./navbar/Navbar";
import { Admin } from "./admin/Admin";
import { ToastContainer } from "react-toastify";
function App() {
  const auth = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return (
    <>
      {<Navbar auth={auth} role={role}></Navbar>}
      {auth && role === "admin" && <Admin></Admin>}
      <Router auth={auth} role={role}></Router>
      <ToastContainer />
    </>
  );
}

export default App;
