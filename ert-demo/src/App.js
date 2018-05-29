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

  // Render all tab labels and currently selected content.
  render = () => (
    <div className='tabs'>
      { React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, {
          data: this.props.data,
          index: this.state.index,
          selectTab: this.selectTab
        });
      }) }
    </div>
  );
}

Tabs.Labels = class TabsLabels extends PureComponent {
  render = () => (
    <div className='tabsLabels' key='labels'>
      { this.props.data.map((tab, index) => {
        const isSelected = index === this.props.index;
        return (
          <div
            className={ classNames('tabsLabel', { isSelected }) }
            key={ index }
            onClick={ this.props.selectTab.bind(null, index) }
          >
            { tab.label }
          </div>
        );
      }) }
    </div>
  );
}

Tabs.Content = class TabsContent extends PureComponent {
  render = () => (
    <div className='tabsContent' key='content'>
      { this.props.data[this.props.index].content }
    </div>
  );
}

class App extends PureComponent {
  // Render DATA using <Tabs />.
  render() {
    return (
      <div className='App'>
        <Tabs data={ DATA }>
          <Tabs.Labels />
          <Tabs.Content />
        </Tabs>
      </div>
    );
  }
}

export default App;
