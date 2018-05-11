import "./index.css";
import React, { Component } from "react";
import FaPlay from "react-icons/lib/fa/play";
import FaPause from "react-icons/lib/fa/pause";
import FaForward from "react-icons/lib/fa/forward";
import FaBackward from "react-icons/lib/fa/backward";

class RadioButton extends Component {
  render() {
    const { isActive, onSelect } = this.props;
    const className = "radio-button " + (isActive ? "active" : "");
    return (
      <button className={className} onClick={onSelect}>
        {this.props.children}
      </button>
    );
  }
}

class RadioGroup extends Component {
  static Button = RadioButton;

  state = { value: this.props.defaultValue }

  render() {
    // Use `React.Children.map` over `this.props.children` to
    // handle both one-child case and mulitple-children case.
    const clones = React.Children.map(
      this.props.children,
      child => {
        return React.cloneElement(child, {
          isActive: child.props.value === this.state.value,
          onSelect: () => {
            this.setState({ value: child.props.value });
          }
        });
      }
    )

    return (
      <fieldset className="radio-group">
        <legend>{this.props.legend}</legend>
        {clones}
      </fieldset>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <RadioGroup defaultValue="pause" legend="Radio Group">
          <RadioGroup.Button value="back">
            <FaBackward />
          </RadioGroup.Button>
          <RadioGroup.Button value="play">
            <FaPlay />
          </RadioGroup.Button>
          <RadioGroup.Button value="pause">
            <FaPause />
          </RadioGroup.Button>
          <RadioGroup.Button value="forward">
            <FaForward />
          </RadioGroup.Button>
        </RadioGroup>
      </div>
    );
  }
}

export default App;
