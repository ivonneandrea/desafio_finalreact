import { useNavigate } from "react-router-dom";
import pizzaNotFound from "../assets/img/facetriste.jpeg";

export const NotFound = () => {
    const navigate = useNavigate();
    const backHome = () => {
        navigate(`/`);
    };

    return (
        <section className="notFound">
            <h4>La página que buscas no existe</h4>
            <img
                className="notFoundImg"
                src={pizzaNotFound}
                alt="face sad"
            />
            <button className="btn btn-warning" onClick={backHome}>
                <strong>Te llevaremos de regreso a la página de inicio.</strong>
            </button>
        </section>
    );
};

export default NotFound;        