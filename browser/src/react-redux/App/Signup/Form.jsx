import React from "react";

const Form = props => {
  return (
    <div className="form">
      <label className="form__label">
        {props.label}
        <span className="form__error">{props.error}</span>
      </label>
      <input
        type={props.type}
        name={props.name}
        onChange={e => props.handleChange(props.name, e.target.value)}
        value={props.value}
        className="form__input"
      />
    </div>
  );
};

export default Form;
