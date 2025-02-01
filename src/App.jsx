import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './Login';
import { Gerente } from './Gerente';
import { Empleado } from './Empleado';
import { Auth } from './Auth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/gerente" element={<Auth element={<Gerente />} allowedRoles={["gerente"]} />} />
        <Route path="/empleado" element={<Auth element={<Empleado />} allowedRoles={["empleado"]} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
