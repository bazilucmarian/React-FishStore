import React, { Component } from "react";
import PropTypes from "prop-types";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import firebase from "firebase";
import { firebaseApp, base } from "../firebase";
class Inventory extends Component {
  state = {
    uid: null,
    owner: null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async (authData) => {
    // 1.Look un the current store in the firebase database
    const store = await base.fetch(this.props.storeId, { context: this });

    // 2.claim it if there is no owner
    if (!store.owner) {
      // save it as our own
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid,
      });
    }
    // 3.Set the state of the inventory component
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });
  };

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const {
      addFish,
      loadSampleFishes,
      fishes,
      updateFish,
      deleteFish,
    } = this.props;

    const logout = <button onClick={this.logout}>Logout !</button>;

    // check if they are logged inventory
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    // check if ther are not owner of this store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the owner</p>
          {logout}
        </div>
      );
    }

    // 3, they must be owner, then appear inventory

    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}

        {Object.keys(fishes).map((key) => {
          return (
            <EditFishForm
              key={key}
              index={key}
              fish={fishes[key]}
              updateFish={updateFish}
              deleteFish={deleteFish}
            />
          );
        })}

        <AddFishForm addFish={addFish} />
        <button onClick={loadSampleFishes}>Load Sample Fishes</button>
      </div>
    );
  }
}
Inventory.propTypes = {
  fishes: PropTypes.object,
  updateFish: PropTypes.func,
  deleteFish: PropTypes.func,
  loadSampleFishes: PropTypes.func,
};
export default Inventory;
