import { Routes, Route } from "react-router-dom";
import { Login, Registration } from "./pages/users";
import { Drive } from "./pages/drive";

function Routing() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Registration />} />
        <Route path="my-drive" element={<Drive />} />
      </Routes>
    </>
  );
}

export default Routing;
