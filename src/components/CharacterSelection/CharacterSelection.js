import React, { Component } from 'react';
import Carousel from 'react-spring-3d-carousel';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import { config } from 'react-spring';
import { characters } from '../../domain/characters';
import NavigationBar from './NavigationBar';
import CharacterDescription from './CharacterDescription';

import './styles.scss';

class CharacterSelection extends Component {
  state = {
    goToSlide: 0,
    currentCharacter: 'female-archer',
    offsetRadius: 2,
    showNavigation: false,
    config: config.gentle
  }

  onChangeInput = e => {
    this.setState({
      [e.target.name]: parseInt(e.target.value, 10) || 0
    });
  };

  buildSlides = () => {
    const slides = []
    Object.keys(characters).forEach((key, index) => {
      const character = characters[key];
      slides.push(
        {
          key: character.class,
          content: <img src={character.image} alt={character.class} />,
          onClick: () => {
            this.setState({ goToSlide: index, currentCharacter: characters[key] })
          }
        }
      );
    })

    return slides;
  }

  onMoveLeftHandler = () => {
    const list = Object.keys(characters);
    let nextIndex = this.state.goToSlide - 1;
    if (nextIndex < 0) {
      nextIndex = list.length - 1;
    }
    const character = list[nextIndex];
    this.setState({ goToSlide: nextIndex, currentCharacter: character })
  }

  onMoveRightHandler = () => {
    const list = Object.keys(characters);
    let nextIndex = this.state.goToSlide + 1;
    if (nextIndex > list.length - 1) {
      nextIndex = 0;
    }
    const character = list[nextIndex];
    this.setState({ goToSlide: nextIndex, currentCharacter: character })
  }

  render() {
    const slides = this.buildSlides();
    const { currentCharacter, goToSlide, offsetRadius, showNavigation, config } = this.state;
    const { onSelectCharacterHandler, onClick } = this.props;

    return (
      <>
        <div className="character-selection-container scale-in-center">
          <h2>Choose your character</h2>

          <div className="carousel-container" style={{ width: "80%", height: "500px", margin: "0 auto" }}>
            <Carousel
              slides={slides}
              goToSlide={goToSlide}
              offsetRadius={offsetRadius}
              showNavigation={showNavigation}
              animationConfig={config}
            />
          </div>

          <NavigationBar onMoveLeft={this.onMoveLeftHandler} onMoveRight={this.onMoveRightHandler} />
        </div>

        <CharacterDescription
          characterClass={currentCharacter}
          character={characters[currentCharacter]}
          onSelectCharacter={(character) => {
            onSelectCharacterHandler(character);
            onClick();
          }}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    character: state.character
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onSelectCharacterHandler: (character) => dispatch({ type: actionTypes.SAVE_CHARACTER, character: character })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSelection);

