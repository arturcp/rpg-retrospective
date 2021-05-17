import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Dialog from '../../components/Dialog/Dialog';
import { npcs, characters } from '../../domain/characters';
import { connect } from 'react-redux';
import './styles.scss';

const Container = styled(TransitionGroup)`
  margin-top: 220px;
`;

class Dialogs extends Component {
  state = {
    currentDialogIndex: 0,
  };

  onSpeechFinished = () => {
    const { currentDialogIndex } = this.state;
    const { dialogsFinished, dialogs } = this.props;

    if (currentDialogIndex + 1 >= dialogs.length) {
      dialogsFinished();
    } else {
      this.setState({ currentDialogIndex: currentDialogIndex + 1 });
    }
  };

  readyToShow = (npcs, dialogs, currentDialogIndex) => dialogs.length > 0
    && npcs.length > 0
    && currentDialogIndex < dialogs.length;

  render() {
    const { background, character, dialogs } = this.props;
    const { currentDialogIndex } = this.state;
    const { backgroundImage, backgroundColor } = background || {};
    const currentCharacter = characters[character.class];

    if (this.readyToShow(npcs, dialogs, currentDialogIndex)) {
      return (
        <Container>
          {background && (
            <div
              className="dialogs-background"
              style={{ backgroundImage: `url(${backgroundImage})`, backgroundColor }}
            />
          )}

          <CSSTransition
            key={currentDialogIndex}
            timeout={300}
            classNames="fade"
          >
            <Dialog
              character={currentCharacter}
              npcs={npcs}
              dialog={dialogs[currentDialogIndex]}
              speechFinished={this.onSpeechFinished}
            />
          </CSSTransition>
        </Container>
      );
    }

    return null;
  }
}

Dialog.propTypes = {
  // Game is a structure that holds all information about
  // the current game. To know more about this object,
  // check `src/domains/game.js`
  game: PropTypes.object,

  // Function that will be executed when the entire
  // dialog ends.
  dialogsFinished: PropTypes.fn,

  // Array of strings containing the sentences of the
  // Dialog.
  dialogs: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    character: state.character
  };
}

const mapDispatchToProps = dispatch => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs);
