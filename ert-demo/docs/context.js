import { createContext } from 'react';

const Context = createContext();

class OuterComponent {
  render = () => (
    <Context.Provider value={ { ... } }>
      <div />
    </Context.Provider>
  );
}

class InnerComponent {
  render = () => (
    <Context.Consumer>
      { (value) => (
        <div />
      ) }
    </Context.Consumer>
  );
}
