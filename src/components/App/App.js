import React, { Component } from "react";
import Image from "../Image";
import Form from "../Form/Form";
import dataInputs from "../../dataInput";

class App extends Component {
  state = {
    formValid: false
  };

  changeState = state => this.setState({ ...state });

  render() {
    return (
      <div className='app-container'>
        {this.state.formValid
          ? <Image/>
          : <Form
            dataInputs={dataInputs}
            onSubmit={this.changeState}
          />
        }
      </div>
    );
  }
}

export default App;