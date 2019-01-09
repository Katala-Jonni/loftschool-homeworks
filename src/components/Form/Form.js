import React, { Component } from "react";
import propTypes from "prop-types";
import Input from "../Input";
import "./Form.css";

const initialState = () => {
  return {
    value: "",
    valid: true
  };
};

class Form extends Component {
  state = {
    formControls: {
      firstname: initialState(),
      lastname: initialState(),
      password: initialState()
    },
    touched: false
  };

  isValidAllInputs = [];

  static get propTypes() {
    return {
      dataInputs: propTypes.object.isRequired,
      onSubmit: propTypes.func.isRequired
    };
  }

  changeState = state => this.setState({ ...state });

  onChange = evt => {
    const { name, value } = evt.target;
    const touched = true;
    const formControls = { ...this.state.formControls };
    const control = formControls[name];
    control.value = value;
    formControls[name] = control;
    this.changeState({ formControls, touched });
  };

  onSubmit = evt => {
    evt.preventDefault();
    const formControls = this.createNewFormControls(evt.currentTarget);
    const formValid = this.isValidAllInputs.every(el => el);
    this.changeState({ formControls, touched: false });
    this.props.onSubmit({ formValid });
    this.isValidAllInputs = [];
  };

  createNewFormControls = form => {
    let formControls = { ...this.state.formControls };
    return Object.keys(formControls)
      .reduce((prev, cur) => {
        const valid = form[cur].value.toLowerCase().trim() === this.props.dataInputs[cur].validText.trim();
        prev[cur] = {
          ...formControls[cur],
          valid
        };
        this.isValidAllInputs.push(valid);
        return prev;
      }, {});
  };

  renderInputs = () => {
    if (!this.props.dataInputs) return null;
    return Object.keys(this.state.formControls).map((collName, idx) => {
      const control = this.state.formControls[collName];
      return (
        <Input
          key={collName + idx}
          value={control.value}
          touched={this.state.touched}
          valid={control.valid}
          onChange={this.onChange}
          {...this.props.dataInputs[collName]}
        />
      );
    });
  };

  render() {
    return (
      <form className='form' onSubmit={this.onSubmit}>
        <h1>Введите свои данные агент</h1>
        {this.renderInputs()}
        <div className="form__buttons">
          <input type="submit" className="button t-submit" value="Проверить"/>
        </div>
      </form>
    );
  }
}

export default Form;