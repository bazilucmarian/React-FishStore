import React, { Component, createRef } from "react";
import PropTypes from "prop-types";

class AddFishForm extends Component {
  priceRef = createRef();
  nameRef = createRef();
  statusRef = createRef();
  descRef = createRef();
  imageRef = createRef();

  createFish = (e) => {
    e.preventDefault();
    const fish = {
      price: Number(this.priceRef.current.value),
      name: this.nameRef.current.value,
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value,
    };
    // update app state
    this.props.addFish(fish);

    // refresh the form
    e.target.reset();
  };
  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input name="price" ref={this.priceRef} placeholder="Price" />
        <input name="name" ref={this.nameRef} placeholder="Name" />
        <select name="status" ref={this.statusRef}>
          <option value="available">Fresh </option>
          <option value="unavailable">Sold Out! </option>
        </select>
        <textarea name="desc" ref={this.descRef} placeholder="Desc" />
        <input name="image" ref={this.imageRef} placeholder="Image" />
        <button type="submit">Add Fish</button>
      </form>
    );
  }
}
AddFishForm.propTypes = {
  addFish: PropTypes.func,
};
export default AddFishForm;
