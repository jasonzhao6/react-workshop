// Take Aways:

//
// 1. Component constructor:
// You can probably refactor it away.
class Tabs extends PureComponent {
  state = { index: 0 };

  selectTab = index => this.setState({ index });
}

//
// 2. Compound components:
// An alternative to config props.
<Tabs data={ DATA }>
  <Tabs.Labels />
  <Tabs.Content />
</Tabs>

//
// 3. Context API:
// A way to teleport props.
<Context.Provider value={ { ... } }>
  <div />
</Context.Provider>

<Context.Consumer>
  { (value) => (
    <div />
  ) }
</Context.Consumer>
