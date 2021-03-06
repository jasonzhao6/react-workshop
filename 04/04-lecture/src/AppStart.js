import "./index.css";
import React from "react";
import createMediaListener from "./createMediaListener";
import { Galaxy, Trees, Earth } from "./screens";
import { CSSTransitionGroup } from "react-transition-group";

const withMedia = queries => Comp => {
  const media = createMediaListener(queries);

  class WithMedia extends React.Component {
    state = {
      media: media.getState()
    };

    componentDidMount() {
      media.listen(media => this.setState({ media }));
    }

    componentWillUnmount() {
      media.dispose();
    }

    render() {
      return <Comp media={this.state.media} />
    }
  }

  WithMedia.displayName = `WithMedia(${(Comp.displayName || Comp.name)})`;

  return WithMedia;
}

class App extends React.Component {
  render() {
    const { media } = this.props;

    return (
      <CSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        {media.big ? (
          <Galaxy key="galaxy" />
        ) : media.tiny ? (
          <Trees key="trees" />
        ) : (
          <Earth key="earth" />
        )}
      </CSSTransitionGroup>
    );
  }
}

const AppWithMedia = withMedia({
  big: "(min-width : 1000px)",
  tiny: "(max-width: 600px)"
})(App)

export default AppWithMedia;
