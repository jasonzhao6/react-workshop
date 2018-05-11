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
    return (
      <div className="Tabs">
        {
          React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {
              activeIndex: this.state.activeIndex,
              disabledTabs: this.props.disabledTabs,
              selectTabIndex: this.selectTabIndex,
            });
          })
        }
      </div>
    );
  }
}

class TabList extends Component {
  render() {
    const { activeIndex, disabledTabs, selectTabIndex } = this.props;

    return (
      <div className="tabs">
        {
          React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(child, {
              isActive: index === activeIndex,
              isDisabled: disabledTabs.indexOf(index) >= 0,
              selectTabIndex: () => selectTabIndex(index),
            });
          })
        }
      </div>
    );
  }
}

class Tab extends Component {
  render() {
    const { isActive, isDisabled, selectTabIndex } = this.props;

    return (
      <div
        className={
          isDisabled ? "tab disabled" : (isActive ? "tab active" : "tab")
        }
        onClick={
          isDisabled ? undefined : selectTabIndex
        }
      >
        {this.props.children}
      </div>
    );
  }
}

class TabPanels extends Component {
  render() {
    const { activeIndex, contents } = this.props;
    return (
      <div className="panels">
        {contents[activeIndex]}
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
        <Tabs data={tabData} disabledTabs={[2, 3]}>
          <TabList>
            {tabData.map((tab, index) => <Tab key={index}>{tab.label}</Tab>)}
          </TabList>
          <TabPanels contents={tabData.map((tab, index) => tab.content)} />
        </Tabs>
      </div>
    );
  }
}

export default App;
