import React, { Component } from "react";
import PropTypes from "prop-types";

class EditFishForm extends Component {
  handleChange = (e) => {
    e.preventDefault();

    // 1.take a copu of updated fish

    const updatedFish = { ...this.props.fish, [e.target.name]: e.target.value };

    console.log(updatedFish);
    this.props.updateFish(this.props.index, updatedFish);
  };

  render() {
    const { fish, deleteFish, index } = this.props;

    return (
      <div className="fish-edit">
        <form>
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            value={fish.name}
          />
          <input
            type="text"
            name="price"
            onChange={this.handleChange}
            value={fish.price}
          />
          <select
            type="text"
            name="status"
            onChange={this.handleChange}
            value={fish.status}
          >
            <option value="available">Fresh</option>
            <option value="unavailable">Sold Out</option>
          </select>
          <textarea
            name="desc"
            onChange={this.handleChange}
            value={fish.desc}
          />
          <input
            type="text"
            name="image"
            onChange={this.handleChange}
            value={fish.image}
          />
        </form>
        <button onClick={() => deleteFish(index)}>Remove Fish</button>
      </div>
    );
  }
}
EditFishForm.propTypes = {
  fish: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    desc: PropTypes.string,
    price: PropTypes.number,
    status: PropTypes.string,
  }),
  index: PropTypes.string,
  updated: PropTypes.func,
};
export default EditFishForm;
