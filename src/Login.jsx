import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const Login = () => {
    const [formData, setFormData] = useState({ correo: "", contrasena: "" });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const credenciales = await fetch("https://85t36tnq-3000.brs.devtunnels.ms/credenciales", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            credentials: "include",
        })
        const { rol, id } = await credenciales.json();

        if (rol === "gerente") {
            navigate("/Gerente"); 
        }
        if (rol === "empleado") {
            navigate("/Empleado");
        }
        console.log(rol, id);
        console.log("Datos enviados:", formData);
    };
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
                <label className="block mb-2">Correo:</label>
                <input
                    type="text"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <label className="block mb-2">Contraseña:</label>
                <input
                    type="password"
                    name="contrasena"
                    value={formData.contrasena}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-4"
                    required
                    autoComplete='correo'
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Enviar
                </button>
            </form>
        </div>
    )
}
