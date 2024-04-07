import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const PizzaContext = createContext();

const PizzaProvider = ({ children }) => {
    const [pizzas, setPizzas] = useState([]);
    const [cart, setCart] = useState([]);

    const urlData = "./src/pizzas.json";

    const getPizzas = async () => {
        try {
            const response = await fetch(urlData);
            if (!response.ok) {
                throw new Error("Data not found");
            }
            const data = await response.json();
            setPizzas(data);
            // console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const addToCart = (pizza) => {
        const pizzaInCart = cart.find((item) => item.id === pizza.id);
        if (pizzaInCart) {
            pizzaInCart.quantity = (pizzaInCart.quantity || 1) + 1;
            setCart([...cart]);
        } else {
            setCart([...cart, { ...pizza, quantity: 1 }]);
        }
        toast.success("🍕 Pizza añadida al carrito", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "dark",
        });
    };

    const totalPrice = cart.reduce(
        (total, pizza) => total + pizza.quantity * pizza.price,
        0
    );

    useEffect(() => {
        getPizzas();
    }, []);

    return (
        <PizzaContext.Provider
            value={{ pizzas, setPizzas, addToCart, cart, setCart, totalPrice }}>
            {children}
        </PizzaContext.Provider>
    );
};

export default PizzaProvider;