import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import CreateAppointment from "./components/CreateAppointment";
import AvailableSlots from "./components/AvailableSlots";
import MyAppointments from "./components/MyAppointments";

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/book-appointment" element={<CreateAppointment />} />
      <Route path="/available-slots" element={<AvailableSlots />} />
      <Route path="/appointments" element={<MyAppointments />} />


    </Routes>

  );

}

export default App;