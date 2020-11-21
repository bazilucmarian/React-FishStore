import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";

import { base } from "../firebase";

class App extends Component {
  state = {
    fishes: {},
    order: {},
  };

  componentDidMount() {
    const { params } = this.props.match;
    //localstorage persistance
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  addFish = (fish) => {
    //   copy to all state beacuse we want also previous fishes objects
    const fishes = { ...this.state.fishes };
    // add new fish to fishes
    fishes[`fish${Date.now()}`] = fish;
    // update the state
    this.setState({ fishes: fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = (key) => {
    //   take a copy of state
    const order = { ...this.state.order };

    // either add to the order, or update the number in our Order
    order[key] = order[key] + 1 || 1;

    // call setState to update our state
    this.setState({ order });
  };

  updateFish = (key, updatedFish) => {
    //   1.take a copy of a current fish
    const fishes = { ...this.state.fishes };

    // 2.update with new state
    fishes[key] = updatedFish;

    // 3.set to state of
    this.setState({ fishes });
  };

  deleteFish = (key) => {
    //   1. take a copy of state
    const fishes = { ...this.state.fishes };
    // 2.update the state
    fishes[key] = null;
    // 3.update setState
    this.setState({ fishes });
  };

  deleteOrder = (key) => {
    //   1. take a copy of state
    const order = { ...this.state.order };

    // 2. update
    delete order[key];

    //update the big state
    this.setState({ order });
  };

  render() {
    const { fishes, order } = this.state;

    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(fishes).map((fish) => {
              return (
                <Fish
                  key={fish}
                  index={fish}
                  addToOrder={this.addToOrder}
                  details={fishes[fish]}
                />
              );
            })}
          </ul>
        </div>
        <Order {...this.state} deleteOrder={this.deleteOrder} />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

App.propTypes = {
  match: PropTypes.object,
};
export default App;
