import classNames from 'classnames';

class WithoutClassNames {
  render() => (
    <div className={ isSelected ? 'tab isSelected' : 'tab' } />
  );
}

class WithClassNames {
  render() => (
    <div className={ classNames('tab', { isSelected }) } />
  );
}
