import React from "react";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Order = ({ order, fishes, deleteOrder }) => {
  const orderIds = Object.keys(order);

  const total = orderIds.reduce((acc, key) => {
    const fish = fishes[key];
    const count = order[key];
    const isAvailable = fish && fish.status === "available";
    if (isAvailable) {
      return acc + count * fish.price;
    }

    return acc;
  }, 0);

  return (
    <div className="order-wrap">
      <h2>Order</h2>
      <TransitionGroup component="ul" className="order">
        {orderIds.map((key) => {
          console.log(key);
          // make sure the fish is loaded before we continue
          if (!fishes[key]) return null;
          const isAvailable = fishes[key].status === "available";

          if (isAvailable) {
            return (
              <CSSTransition
                classNames="order"
                key={key}
                timeOut={{ enter: 250, exit: 250 }}
              >
                <li key={key}>
                  {order[key]}x {fishes[key].name} ---
                  {formatPrice(order[key] * fishes[key].price)}
                  <button
                    style={{ fontSize: "30px" }}
                    onClick={() => deleteOrder(key)}
                  >
                    &times;
                  </button>
                </li>
              </CSSTransition>
            );
          } else {
            return (
              <li key={key}>
                Sorry {fishes[key] ? fishes[key].name : "fish"} is no longer
                available
              </li>
            );
          }
        })}
      </TransitionGroup>
      <div className="total">
        <strong> {formatPrice(total)}</strong>
      </div>
    </div>
  );
};

export default Order;
