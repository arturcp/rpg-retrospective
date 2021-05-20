import React, { Component } from 'react';
import { Button } from 'antd';

import './prologue.scss';

class Prologue extends Component {
  componentDidMount () {
    this.createScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.2/TweenMax.min.js');
    this.createScript('https://codepen.io/mimikos/pen/GvpJYQ.js');
    this.createScript('https://codepen.io/mimikos/pen/rzOOgG.js');
  }

  createScript = (url) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    const { character, onClick } = this.props;

    return (
      <main className="prologue-content" id="main-content">
        <div className="titleCont">
          <h1 className="main-title" id="main-title">
            <span>Whether to serve a corrupt and failing empire,</span><br />
            <span style={{ paddingLeft: '10px' }}>or to challenge the fate against {character.gender === 'male' ? 'his' : 'her'} own destiny...</span><br />
            <span style={{ paddingLeft: '-20px' }}>What was the {character.title.toLowerCase()} to do?</span>
          </h1>
        </div>
        <canvas id="noise" className="noise"></canvas>
        <div className="vignette"></div>

        <Button type="default" size="large" onClick={onClick}>
          Start the journey
        </Button>
      </main>
    )
  }
}

export default Prologue;
