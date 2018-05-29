import React, { PureComponent } from 'react';
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

class Tabs extends PureComponent {
  state = { index: 0 };

  // Callback method to select a tab on click.
  selectTab = index => this.setState({ index });

  renderLabels = () => (
    <div className='tabsLabels' key='labels'>
      { this.props.data.map((tab, index) => {
        const isSelected = index === this.state.index;
        return (
          <div
            className={ classNames('tabsLabel', { isSelected }) }
            key={ index }
            onClick={ this.selectTab.bind(null, index) }
          >
            { tab.label }
          </div>
        );
      }) }
    </div>
  );

  renderContent = () => (
    <div className='tabsContent' key='content'>
      { this.props.data[this.state.index].content }
    </div>
  );

  // Render all tab labels and currently selected content.
  render() {
    return (
      <div className='tabs'>
        { this.props.showContentBeforeLabels
          ? [this.renderContent(), this.renderLabels()]
          : [this.renderLabels(), this.renderContent()]
        }
      </div>
    );
  }
}

class App extends PureComponent {
  // Render DATA using <Tabs />.
  render() {
    return (
      <div className='App'>
        <Tabs data={ DATA } showContentBeforeLabels={ true } />
      </div>
    );
  }
}

export default App;
