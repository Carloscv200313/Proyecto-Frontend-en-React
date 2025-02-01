import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Navigate} from "react-router-dom";
import Cookies from "js-cookie";

export const Auth = ({ element, allowedRoles }) => {
    const [userRole, setUserRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verificarToken = async () => {
            try {
                const response = await fetch("https://85t36tnq-3000.brs.devtunnels.ms/verificar", {
                    method: "GET",
                    credentials: "include", // Necesario para enviar cookies
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data.user);
                    setUserRole(data.user); // Extrae el rol desde el backend
                } else {
                    setUserRole(null);
                }
            } catch (error) {
                console.error("Error verificando autenticación:", error);
                setUserRole(null);
            } finally {
                setIsLoading(false);
        };
        const cokie=Cookies.get('mytoken')
        console.log("estas sonlas cookies de la libreria de jona"+cokie);
        Auth.propTypes = {
            element: PropTypes.element.isRequired,
            allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
        };
        };

        verificarToken();
    }, []);

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (!userRole) {
        return <Navigate to="/" />;
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to={`/${userRole}`}  />;
    }

    return element;
};
