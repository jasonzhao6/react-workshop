import React from "react";
import createOscillator from "./createOscillator";
import SineWave from "./SineWave";
import "./index.css";

class Tone extends React.PureComponent {
  oscillator = createOscillator();

  componentDidMount(prevProps) {
    this.doImperativeStuff(prevProps);
  }

  componentDidUpdate(prevProps) {
    this.doImperativeStuff(prevProps);
  }

  doImperativeStuff(prevProps) {
    if (!prevProps) return;

    let { isPlaying, pitch, volume } = this.props;

    if (!prevProps.isPlaying && isPlaying) {
      this.oscillator.play();
    } else if (prevProps.isPlaying && !isPlaying) {
      this.oscillator.stop();
    }

    if (pitch !== prevProps.pitch) {
      this.oscillator.setPitchBend(pitch);
    }

    if (volume !== prevProps.volume) {
      this.oscillator.setVolume(volume);
    }
  }

  render() {
    return null;
  }
}

class App extends React.Component {
  state = {
    isPlaying: false,
    volume: 0.5,
    pitch: 0.5
  }

  play = () => {
    this.setState({ isPlaying: true });
  };

  stop = () => {
    this.setState({ isPlaying: false });
  };

  changeTone = event => {
    const { clientX, clientY } = event;
    const { top, right, bottom, left } = event.target.getBoundingClientRect();
    const pitch = (clientX - left) / (right - left);
    const volume = 1 - (clientY - top) / (bottom - top);
    this.setState({ pitch, volume });
  };

  render() {
    return (
      <div className="App">
        <div
          className="theremin"
          onMouseEnter={this.play}
          onMouseLeave={this.stop}
          onMouseMove={this.changeTone}
        >
          <Tone
            isPlaying={this.state.isPlaying}
            pitch={this.state.pitch / 2}
            volume={this.state.volume}
          />
          <Tone
            isPlaying={this.state.isPlaying}
            pitch={this.state.pitch * 2.5}
            volume={this.state.volume}
          />
          <Tone
            isPlaying={this.state.isPlaying}
            pitch={this.state.pitch}
            volume={this.state.volume}
          />
          <SineWave
            width="400px"
            height="400px"
            amplitude={this.state.volume}
            frequency={this.state.pitch}
            draw={this.state.isPlaying}
          />
        </div>
        <div className="label pitch">◀︎ Pitch ▶︎</div>
        <div className="label volume">◀︎ Volume ▶︎</div>
      </div>
    );
  }
}

export default App;
