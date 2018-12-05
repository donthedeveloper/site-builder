import React from "react";

const Form = props => {
  const regExReplace = str => {
    let idx = str.search(/[A-Z]/g);
    let newStr = str.replace(/^[a-zA-Z]/g, str => str.toUpperCase());
    if (idx != -1) {
      newStr = newStr.split("");
      newStr.splice(idx, 0, " ");
      newStr = newStr.join("");
    }
    return newStr;
  };
  return (
    <div className="form">
      <label className="form__label">{regExReplace(props.label)}</label>
      <input
        type="text"
        name={props.label}
        onChange={e => props.handleChange(props.label, e.target.value)}
        value={props.value}
        className="form__input"
      />
    </div>
  );
};

export default Form;
