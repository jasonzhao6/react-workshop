import React, { PureComponent, createContext } from 'react';
import classNames from 'classnames';
import * as icons from 'react-icons/lib/fa';
import * as texts from './texts';
import './index.css';

const DATA = [
  { label: <icons.FaAutomobile />,   content: <texts.Cars /> },
  { label: <icons.FaBed />,          content: <texts.Hotels /> },
  { label: <icons.FaPlane />,        content: <texts.Flights /> },
  { label: <icons.FaSpaceShuttle />, content: <texts.Space /> }
];

const Context = createContext();

class Tabs extends PureComponent {
  state = { index: 0 };

  // Callback method to select a tab on click.
  selectTab = index => this.setState({ index });

  // Render all tab labels and currently selected content.
  render = () => (
    <Context.Provider value={ {
      data: this.props.data,
      index: this.state.index,
      selectTab: this.selectTab
    } }>
      <div className='tabs'>
        { this.props.children }
      </div>
    </Context.Provider>
  );
}

Tabs.Labels = class TabsLabels extends PureComponent {
  render = () => (
    <Context.Consumer>
      { (value) => (
        <div className='tabsLabels' key='labels'>
          { value.data.map((tab, index) => {
            const isSelected = index === value.index;
            return (
              <div
                className={ classNames('tabsLabel', { isSelected }) }
                key={ index }
                onClick={ value.selectTab.bind(null, index) }
              >
                { tab.label }
              </div>
            );
          }) }
        </div>
      ) }
    </Context.Consumer>
  );
}

Tabs.Content = class TabsContent extends PureComponent {
  render = () => (
    <Context.Consumer>
      { (value) => (
        <div className='tabsContent' key='content'>
          { value.data[value.index].content }
        </div>
      ) }
    </Context.Consumer>
  );
}

class App extends PureComponent {
  // Render DATA using <Tabs />.
  render() {
    return (
      <div className='App'>
        <Tabs data={ DATA }>
          <div>
            <Tabs.Labels />
            <Tabs.Content />
          </div>
        </Tabs>
      </div>
    );
  }
}

export default App;
