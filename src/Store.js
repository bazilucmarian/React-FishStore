import React, { createRef } from "react";
import { getFunName } from "./helpers";

const Store = ({ history }) => {
  const input = createRef();

  const goToStore = (e) => {
    e.preventDefault();
    history.push(`/store/${input.current.value}`);
  };

  return (
    <form className="store-selector" onSubmit={goToStore}>
      <h2>Please enter a store</h2>
      <input
        ref={input}
        type="text"
        required
        placeholder="Enter store"
        defaultValue={getFunName()}
      />
      <button type="submit">Visit store</button>
    </form>
  );
};

export default Store;
