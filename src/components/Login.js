import React from "react";
import PropTypes from "prop-types";

const Login = ({ authenticate }) => {
  return (
    <nav className="login">
      <h2>Inventory login</h2>
      <p>Sign in to manage your store inventory</p>
      <button className="github" onClick={() => authenticate("Github")}>
        Login with github
      </button>
      <button className="twitter" onClick={() => authenticate("Google")}>
        Login with Google
      </button>
      <button className="facebook" onClick={() => authenticate("Facebook")}>
        Login with Facebook
      </button>
    </nav>
  );
};

Login.propTypes = {
  authenticate: PropTypes.func.isRequired,
};

export default Login;
