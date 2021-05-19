import React, { Component } from 'react';
import Carousel from 'react-spring-3d-carousel';
import { connect } from 'react-redux';
import { config } from 'react-spring';
import { characters } from '../../domain/characters';
import * as actionTypes from '../../store/actions';
import NavigationBar from './NavigationBar';
import CharacterDescription from './CharacterDescription';

import './styles.scss';

class CharacterSelection extends Component {
  state = {
    goToSlide: 0,
    currentCharacterType: 'female-archer',
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
          key: character.type,
          content: <img src={character.image} alt={character.type} />,
          onClick: () => {
            this.setState({ goToSlide: index, currentCharacterType: key })
          }
        }
      );
    })

    return slides;
  }

  onMoveLeftHandler = () => {
    const characterTypes = Object.keys(characters);
    let nextIndex = this.state.goToSlide - 1;
    if (nextIndex < 0) {
      nextIndex = characterTypes.length - 1;
    }
    const character = characterTypes[nextIndex];
    this.setState({ goToSlide: nextIndex, currentCharacterType: character })
  }

  onMoveRightHandler = () => {
    const characterTypes = Object.keys(characters);
    let nextIndex = this.state.goToSlide + 1;
    if (nextIndex > characterTypes.length - 1) {
      nextIndex = 0;
    }
    const characterType = characterTypes[nextIndex];
    this.setState({ goToSlide: nextIndex, currentCharacterType: characterType })
  }

  render() {
    const slides = this.buildSlides();
    const { currentCharacterType, goToSlide, offsetRadius, showNavigation, config } = this.state;
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
          characterType={currentCharacterType}
          character={characters[currentCharacterType]}
          onSelectCharacter={(characterType) => {
            onSelectCharacterHandler(characterType);
            onClick();
          }}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onSelectCharacterHandler: (characterType) => {
      const character = characters[characterType];
      dispatch({ type: actionTypes.SAVE_CHARACTER, characterType, character })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSelection);

