import React, { Component } from 'react';
import Carousel from 'react-spring-3d-carousel';
import { config } from 'react-spring';
import { characters } from './characters';

import './styles.scss';

export default class CharacterSelection extends Component {
  state = {
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    config: config.gentle
  }

  onChangeInput = e => {
    this.setState({
      [e.target.name]: parseInt(e.target.value, 10) || 0
    });
  };

  render() {
    const slides = characters.map((character, index) => ({
      key: character.class,
      content: <img src={character.image} alt={character.class} />,
      onClick: () => {
        this.setState({ goToSlide: index })
      }
    }));

    return (
      <div className="character-selection-container scale-in-center">
        <h2>Choose your character</h2>

        <div className="carousel-container" style={{ width: "80%", height: "500px", margin: "0 auto" }}>
          <Carousel
            slides={slides}
            goToSlide={this.state.goToSlide}
            offsetRadius={this.state.offsetRadius}
            showNavigation={this.state.showNavigation}
            animationConfig={this.state.config}
          />
        </div>
      </div>
    );
  }
}
