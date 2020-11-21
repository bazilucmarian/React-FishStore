import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";
const Fish = ({
  details: { name, image, desc, price, status },
  index,
  addToOrder,
}) => {
  const isAvailable = status === "available";

  return (
    <li className="menu-fish">
      <img src={image} alt="name" />
      <h3 className="fish-name">
        {name}
        <span className="fish-price">{formatPrice(price)}</span>
      </h3>
      <p>{desc}</p>

      <button disabled={!isAvailable} onClick={() => addToOrder(index)}>
        {!isAvailable ? "Sold Out" : "Add to order"}
      </button>
    </li>
  );
};
Fish.propTypes = {
  details: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    desc: PropTypes.string,
    status: PropTypes.string,
  }),
  addToOrder: PropTypes.func,
};

export default Fish;
