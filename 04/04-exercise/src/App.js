/*
Create a `withStorage` higher order component that manages saving and retrieving
the `sidebarIsOpen` state to local storage
*/

import "./index.css";
import React from "react";
import MenuIcon from "react-icons/lib/md/menu";
import { set, get, subscribe } from "./local-storage";

const capitalize = str => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

const withStorage = (key, defaultValue) => Comp => {
  class WithStorage extends React.Component {
    state = {
      [key]: get(key, defaultValue)
    };

    componentDidMount() {
      this.unsubscribe = subscribe(() => {
        this.setState({
          [key]: get(key)
        });
      });
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      return (
        <Comp
          { ...this.props }
          { ...this.state }
          { ...({ [`set${capitalize(key)}`]: value => set(key, value) }) }
        />
      );
    }
  }

  WithStorage.displayName = `WithStorage(${(Comp.displayName || Comp.name)})`;

  return WithStorage;
}

class App extends React.Component {
  render() {
    const { sidebarIsOpen, setSidebarIsOpen } = this.props;
    return (
      <div className="app">
        <header>
          <button
            className="sidebar-toggle"
            title="Toggle menu"
            onClick={() => {
              setSidebarIsOpen(!sidebarIsOpen);
            }}
          >
            <MenuIcon />
          </button>
        </header>

        <div className="container">
          <aside className={sidebarIsOpen ? "open" : "closed"} />
          <main />
        </div>
      </div>
    );
  }
}

export default withStorage("sidebarIsOpen", false)(App);
