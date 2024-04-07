import { useContext, useEffect } from "react";
import { PizzaContext } from "../context/PizzaContext";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";
import formatPrice from '../helpers/formatPrice.js';

const CarritoDetails = () => {
    const { cart, setCart, totalPrice } = useContext(PizzaContext);

    const increment = (pizzaIndex) => {
        const updateCart = cart.map((pizza) => {
            if (pizza.id === pizzaIndex) {
                return { ...pizza, quantity: (pizza.quantity || 1) + 1 };
            }
            return pizza;
        });
        setCart(updateCart);
    };

    const decrement = (pizzaIndex) => {
        const updateCart = cart.map((pizza) => {
            if (pizza.id === pizzaIndex && pizza.quantity > 0) {
                return { ...pizza, quantity: pizza.quantity - 1 };
            }
            return pizza;
        });
        const filterCart = updateCart.filter((pizza) => pizza.quantity > 0);
        setCart(filterCart);
    };

    const goToPay = () => {
        Swal.fire({
            title: "¿Estás segura de que quieres pagar?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#ff9d1d",
            cancelButtonColor: "#7a1616",
            confirmButtonText: "Si!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Muy Bien!",
                    text: "Gracias por su interés en nuestra pizzería.",
                    confirmButtonColor: "#ff9d1d",
                });
            }
        });
    };

    useEffect(() => {}, [cart]);

    return (
        <section className="cart">
            <h3>Detalles del pedido</h3>
            {cart.map((pizza, p) => (
                <div key={p} className="cartDetails">
                    <article className="cartImgName">
                        <img
                            className="cartImg"
                            src={pizza.img}
                            alt={pizza.name}
                        />
                        <p>
                            <strong className="text-capitalize">
                                {pizza.name}
                            </strong>
                        </p>
                    </article>
                    <article className="cartPriceQuantity">
                        <h5>
                            {formatPrice(pizza.price * (pizza.quantity || 1))}
                        </h5>
                        <button
                            className="cartButton decrement"
                            onClick={() => decrement(pizza.id)}
                            data-tooltip-id="my-tooltip-1"
                            data-tooltip-content="Quitar una pizza"
                            data-tooltip-place="top">
                            -
                        </button>
                        <Tooltip
                            id="my-tooltip-1"
                        />
                        <h5>{pizza.quantity || 1}</h5>
                        <button
                            className="cartButton increment"
                            onClick={() => increment(pizza.id)}
                            data-tooltip-id="my-tooltip-2"
                            data-tooltip-content="Agregar una pizza"
                            data-tooltip-place="top">
                            +
                        </button>
                        <Tooltip
                            id="my-tooltip-2"
                        />
                    </article>
                </div>
            ))}
            <article className="cartTotalPrice">
                <h4>
                    Total: <span>{formatPrice(totalPrice)}</span>
                </h4>
                <button className="cartPayButton" onClick={goToPay}>
                   Ir a pagar
                </button>
            </article>
        </section>
    );
};

export default CarritoDetails;