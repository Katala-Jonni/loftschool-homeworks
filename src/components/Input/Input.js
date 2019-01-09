import React from "react";
import propTypes from "prop-types";

const Input = props => {
  const { name, label, value, type, errorMessage, errorEmptyMessage, onChange, touched, valid } = props;
  const htmlFor = `${name}-${Math.round(Math.random() * Date.now())}`;
  const text = value.length ? errorMessage : errorEmptyMessage;
  return (
    <p className="field">
      <label className="field__label" htmlFor={htmlFor}>
        <span className="field-label">{label}</span>
      </label>
      <input
        className={`field__input field-input t-input-${name}`}
        type={type}
        name={name}
        id={htmlFor}
        value={value}
        onChange={onChange}
      />
      <span className={`field__error field-error t-error-${name}`}>{!touched && !valid && text}</span>
    </p>
  );
};

Input.defaultProps = {
  value: "",
  errorEmptyMessage: "Обязательное поле для заполнения",
  errorMessage: "Поле указано не верно",
  type: "text"
};

Input.propTypes = {
  name: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  type: propTypes.string,
  errorMessage: propTypes.string,
  errorEmptyMessage: propTypes.string,
  value: propTypes.string,
  touched: propTypes.bool,
  valid: propTypes.bool,
  onChange: propTypes.func.isRequired
};

export default Input;