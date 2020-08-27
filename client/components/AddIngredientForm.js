import React, { Component } from "react";
export default class AddIngredientForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.addIngredient(this.props.id, this.state);
    this.setState({
      name: "",
    });
  }
  render() {
    return (
      <div className="box">
        <form onSubmit={this.handleSubmit}>
          <h1>Add new ingredient</h1>

          <div>
            <input
              className="input"
              type="text"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>
          <br />

          <button type="submit">Submit</button>
        </form>
        <br />
      </div>
    );
  }
}
