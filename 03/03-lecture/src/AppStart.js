import "./index.css";
import React, { Component, createContext } from "react";
import FaAutomobile from "react-icons/lib/fa/automobile";
import FaBed from "react-icons/lib/fa/bed";
import FaPlane from "react-icons/lib/fa/plane";
import FaSpaceShuttle from "react-icons/lib/fa/space-shuttle";
import * as text from "./text";

const TabContext = createContext();

class Tabs extends Component {
  state = {
    activeIndex: 0
  };

  selectTabIndex = activeIndex => {
    this.setState({ activeIndex });
  };

  render() {
    return (
      <TabContext.Provider value={{
        activeIndex: this.state.activeIndex,
        onSelectTab: this.selectTabIndex
      }}>
        <div className="Tabs">{this.props.children}</div>;
      </TabContext.Provider>
    );
  }
}

class TabList extends Component {
  render() {
    const { children } = this.props;
    return (
      <TabContext.Consumer>
        {(context) => {
          const { activeIndex, onSelectTab } = context;
          const clones = React.Children.map(children, (child, index) => {
            return React.cloneElement(child, {
              isActive: index === activeIndex,
              onSelect: () => onSelectTab(index)
            });
          });
          return <div className="tabs">{clones}</div>;
        }}
      </TabContext.Consumer>
    );
  }
}

class Tab extends Component {
  render() {
    const { isActive, isDisabled, onSelect } = this.props;
    return (
      <div
        className={
          isDisabled ? "tab disabled" : isActive ? "tab active" : "tab"
        }
        onClick={isDisabled ? null : onSelect}
      >
        {this.props.children}
      </div>
    );
  }
}

class TabPanels extends Component {
  render() {
    const { children } = this.props;
    return (
      <TabContext.Consumer>
        {(context) => {
          const { activeIndex } = context;
          return <div className="panels">{children[activeIndex]}</div>;
        }}
      </TabContext.Consumer>
    );
  }
}

class TabPanel extends Component {
  render() {
    return this.props.children;
  }
}

class DataTabs extends Component {
  render() {
    const { data } = this.props;
    return (
      <Tabs>
        <TabList>
          {data.map((tab, index) => <Tab key={index}>{tab.label}</Tab>)}
        </TabList>
        <TabPanels>
          {data.map((tab, index) => (
            <TabPanel key={index}>{tab.content}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Tabs>
          <div>
            <TabList>
              <Tab>
                <FaAutomobile />
              </Tab>
              <Tab>
                <FaBed />
              </Tab>
              <Tab>
                <FaPlane />
              </Tab>
              <Tab>
                <FaSpaceShuttle />
              </Tab>
            </TabList>
          </div>
          <div>
            <TabPanels>
              <TabPanel>{text.cars}</TabPanel>
              <TabPanel>{text.hotels}</TabPanel>
              <TabPanel>{text.flights}</TabPanel>
              <TabPanel>{text.space}</TabPanel>
            </TabPanels>
          </div>
        </Tabs>
      </div>
    );
  }
}

export default App;
