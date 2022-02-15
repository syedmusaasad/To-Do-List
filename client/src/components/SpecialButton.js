import React from "react";

const SpecialButton = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={props.className}
      style={styles.button}
    >
      {props.value}
    </div>
  );
};

const styles = {
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50px",
    fontFamily: "Helvetica",
    fontSize: "30px",
    color: "#413d44",
    padding: "5px",
  },
};

export default SpecialButton;
