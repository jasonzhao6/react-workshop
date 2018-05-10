////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Refactor App by creating a new component named `<GeoPosition>`
// - <GeoPosition> should use a render prop callback that passes
//   the coords and error
// - When you're done, <App> should no longer have anything but
//   a render method
// - Now create a <GeoAddress> component that also uses a render
//   prop callback with the current address. You will use
//   `getAddressFromCoords(latitude, longitude)` to get the
//   address. It returns a promise.
// - You should be able to compose <GeoPosition> and <GeoAddress>
//   beneath it to naturally compose both the UI and the state
//   needed to render
// - Make sure <GeoAddress> supports the user moving positions
import "./index.css";
import React from "react";
import LoadingDots from "./LoadingDots";
import Map from "./Map";
import getAddressFromCoords from './getAddressFromCoords'

class GeoPosition extends React.Component {
  state = {
    coords: null,
    error: null
  };

  componentDidMount() {
    this.geoId = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          coords: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      },
      error => {
        this.setState({ error });
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.geoId);
  }

  render() {
    return this.props.children(this.state);
  }
}

class GeoAddress extends React.Component {
  state = {
    address: undefined
  }

  componentDidMount() {
    this.fetchAddress();
  }

  // Be careful to not write an infinite loop!
  // It happens when `componentDidUpdate` sets state,
  // Which then trigers `componentDidUpdate` again.
  componentDidUpdate() {
    // Ensure no `setUpdate` here.
  }

  async fetchAddress() {
    const { lat, lng } = this.props.coords;
    let address = await getAddressFromCoords(lat, lng);
    this.setState({ address });
  }

  render() {
    return this.props.children(this.state.address)
  }
}

class App extends React.Component {
  renderError(state) {
    return <div>Error: {state.error.message}</div>;
  }

  renderGeoAddress(state) {
    return (
      <GeoAddress coords={state.coords}>
        {address => (
          <Map
            lat={state.coords.lat}
            lng={state.coords.lng}
            info={address}
          />
        )}
      </GeoAddress>
    );
  }

  renderLoadingDots(state) {
    return <LoadingDots />;
  }

  render() {
    return (
      <div className="app">
        <GeoPosition>
          {state => (
            state.error
              ? this.renderError(state)
              : (
                state.coords
                  ? this.renderGeoAddress(state)
                  : this.renderLoadingDots(state)
              )
          )}
        </GeoPosition>
      </div>
    );
  }
}

export default App;
