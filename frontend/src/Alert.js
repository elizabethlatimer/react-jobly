import React from "react";

function Alert({ type, messages }) {
  return (
    <div className={`alert alert-${type}`} role="alert">
      {messages.map(error => {
        if (error.includes("password")) {
          error = "Password may only contain letters, numbers, spaces, and special characters !#%$&'()*+,./:;<=>?@^_`{|}~-"
        }
        if (error.includes("username")) {
          error = "Username may only contain letters, numbers, underscores(_) and dashes(-)"
        }
        return (
        <p className="mb-0 small" key={error}>
          {error}
        </p>
      )}
      )}
    </div>
  );
}

Alert.defaultProps = {
  type: "danger",
  messages: []
};

export default Alert;
