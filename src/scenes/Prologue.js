import React, { Component } from 'react';
import './prologue.scss';

class Prologue extends Component {
  componentDidMount () {
    this.createScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.2/TweenMax.min.js');
    this.createScript('https://codepen.io/mimikos/pen/GvpJYQ.js');
    this.createScript('https://codepen.io/mimikos/pen/rzOOgG.js');

    setTimeout(() => {
      this.props.onAnimationEnd();
    }, 8000);
  }

  createScript = (url) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    return (
      <main className="prologue-content" id="main-content">
        <div className="titleCont">
          <h1 className="main-title" id="main-title">
            <span>Whether to serve a corrupt and failing empire,</span><br />
            <span style={{ paddingLeft: '10px' }}>or to challenge the fates for the world's destiny,</span><br />
            <span style={{ paddingLeft: '-20px' }}>What was a hero to do?"</span>
          </h1>
        </div>
        <canvas id="noise" className="noise"></canvas>
        <div className="vignette"></div>
      </main>
    )
  }
}

export default Prologue;


// const prologue = (props) => {
//   return (
//     <main className="prologue-content" id="main-content">
//       <div className="titleCont">
//         <h1 className="main-title" id="main-title">
//           <span>Whether to serve a corrupt and failing empire,</span><br />
//           <span style={{ paddingLeft: '100px' }}>or to challenge the fates,</span><br />
//           <span style={{ paddingRight: '110px' }}>and fight for the world's destiny,</span><br />
//           <span style={{ paddingLeft: '-20px' }}>What should you do?"</span>
//         </h1>
//       </div>
//       <canvas id="noise" className="noise"></canvas>
//       <div className="vignette"></div>
//     </main>
//   )
// }

// export default prologue;


