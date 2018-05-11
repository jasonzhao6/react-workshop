/*

Make these two components work like a normal <select><option/></select>
component.

First, don't worry about accessibility, we want to illustrate controlled v.
uncontrolled components first.

First, make the uncontrolled usage work. This means it will keep the value in
state.

1. Get the label to display correctly based on state.
2. When you click the component it opens/closes
3. When you click an option the component closes and updates the value in
   state, and the label displays correctly

Now, make the uncontrolled version work. Instead of reading from state, you'll
read from props, and instead of setting state, you'll need to do something
else!

Once you've got that done, get started on making it accessible.

Here are some guides, but we'll be doing it together as a class, too.

https://www.w3.org/TR/wai-aria-practices-1.1/#Listbox
https://www.w3.org/TR/wai-aria-practices-1.1/examples/listbox/listbox-collapsible.html

*/

import "./index.css";
import React from "react";
import PropTypes from "prop-types";

React.Children.mapWithSideEffects = React.Children.map;

class Select extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    defaultValue: PropTypes.any
  };

  state = {
    isOpen: false,
    value: this.props.defaultValue
  }

  isControlled = () => {
    return this.props.value && this.props.onChange;
  };

  selectValue = (value) => {
    if (this.isControlled()) {
      this.props.onChange(value);
      this.setState({
        isOpen: false,
      });
    } else {
      this.setState({
        isOpen: false,
        value,
      });
    }
  }

  render() {
    let label;
    const { value } = this.isControlled() ? this.props : this.state;

    const clones =
      React.Children.mapWithSideEffects(this.props.children, child => {

      if (child.props.value === value) {
        label = child.props.children;
      }

      return React.cloneElement(child, {
        selectValue: () => this.selectValue(child.props.value)
      });
    });

    return (
      <div className="select">
        <button
          className="label"
          onClick={() => this.setState({ isOpen: true })}
        >
          {label} <span className="arrow">▾</span>
        </button>
        { this.state.isOpen && <ul className="options">{clones}</ul> }
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    return (
      <li
        className="option"
        onClick={this.props.selectValue}
      >
        {this.props.children}
      </li>
    );
  }
}

class App extends React.Component {
  state = {
    value: "dosa"
  };

  setToMintChutney = () => {
    this.setState({
      value: "mint-chutney"
    });
  };

  render() {
    return (
      <div className="app">
        <div className="block">
          <h2>Uncontrolled</h2>
          <Select defaultValue="tikka-masala">
            <Option value="tikka-masala">Tikka Masala</Option>
            <Option value="tandoori-chicken">Tandoori Chicken</Option>
            <Option value="dosa">Dosa</Option>
            <Option value="mint-chutney">Mint Chutney</Option>
          </Select>
        </div>

        <div className="block">
          <h2>Controlled</h2>
          <p>
            <button onClick={this.setToMintChutney}>Set to Mint Chutney</button>
          </p>
          <Select
            value={this.state.value}
            onChange={value => {
              this.setState({ value });
            }}
          >
            <Option value="tikka-masala">Tikka Masala</Option>
            <Option value="tandoori-chicken">Tandoori Chicken</Option>
            <Option value="dosa">Dosa</Option>
            <Option value="mint-chutney">Mint Chutney</Option>
          </Select>
        </div>
      </div>
    );
  }
}

export default App;
