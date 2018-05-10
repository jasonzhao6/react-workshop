import "./index.css";
import React, { Component } from "react";
import FaAutomobile from "react-icons/lib/fa/automobile";
import FaBed from "react-icons/lib/fa/bed";
import FaPlane from "react-icons/lib/fa/plane";
import FaSpaceShuttle from "react-icons/lib/fa/space-shuttle";
import * as text from "./text";

class Tabs extends Component {
  state = {
    activeIndex: 0
  };

  selectTabIndex = activeIndex => {
    this.setState({ activeIndex });
  };

  render() {
    const { data, disabledTabs } = this.props;

    const tabs = (
      <div key="tabs" className="tabs">
        {data.map((tab, index) => {
          const isActive = index === this.state.activeIndex;
          const isDisabled = disabledTabs.indexOf(index) >=0 ;
          return (
            <div
              key={index}
              className={
                isDisabled ? "tab disabled" : (isActive ? "tab active" : "tab")
              }
              onClick={
                isDisabled ? undefined : () => this.selectTabIndex(index)
              }
            >
              {tab.label}
            </div>
          );
        })}
      </div>
    );

    const panel = (
      <div key="panel" className="panels">{data[this.state.activeIndex].content}</div>
    );

    return (
      <div className="Tabs">
        {this.props.tabsOnBottom ? [panel, tabs] : [tabs, panel]}
      </div>
    );
  }
}

class App extends Component {
  render() {
    const tabData = [
      {
        label: <FaAutomobile />,
        content: text.cars
      },
      {
        label: <FaBed />,
        content: text.hotels
      },
      {
        label: <FaPlane />,
        content: text.flights
      },
      {
        label: <FaSpaceShuttle />,
        content: text.space
      }
    ];

    return (
      <div className="App">
        <Tabs data={tabData} disabledTabs={[2, 3]} tabsOnBottom />
      </div>
    );
  }
}

export default App;
