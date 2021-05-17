/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import typewriter from './typewriter';

import './styles.scss';

class DialogBox extends Component {
  constructor(props) {
    super(props);
    const { text } = this.props;

    this.dialogBoxRef = React.createRef();

    this.state = {
      mode: 'typing',
      currentIndex: 0,
      currentText: text[0],
    };
  }

  componentDidMount() {
    document.removeEventListener('keydown', this.onKeyPress);
    document.addEventListener('keydown', this.onKeyPress);

    const { mode, currentText } = this.state;
    if (mode === 'typing' && this.dialogBoxRef.current) {
      typewriter(this.dialogBoxRef.current, currentText,
        this.onSpeechEndHandler);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyPress);
  }

  onSpeechEndHandler = () => {
    const { mode } = this.state;

    if (mode === 'typing') {
      this.setState({ mode: 'flat' });
    }
  };

  changeBoxState = () => {
    const { mode } = this.state;
    let { currentIndex } = this.state;
    const { text, speechFinished } = this.props;

    const typingCompleted = document.querySelector('.dialog-box div').textContent === text[currentIndex];
    const userInterrupedTyping = mode === 'typing' && !typingCompleted;

    if (userInterrupedTyping) {
      this.setState({ mode: 'flat' });
    } else {
      currentIndex += 1;
      const endOfDialog = currentIndex > text.length - 1;

      if (endOfDialog) {
        speechFinished();
      } else {
        this.setState({
          mode: 'typing',
          currentIndex,
          currentText: text[currentIndex],
        });

        typewriter(this.dialogBoxRef.current, text[currentIndex],
          this.onSpeechEndHandler);
      }
    }
  };

  onKeyPress = (e) => {
    if (e.keyCode === 13 || (e.keyCode >= 37 && e.keyCode <= 40)) {
      this.changeBoxState();
    }
  };

  renderAvatar = (direction) => {
    const { avatar, labelColor, name } = this.props;
    return (
      avatar && (
        <div className={`dialog-avatar ${direction}`}>
          <img src={avatar} alt="avatar" />
          <div
            className="avatar-name"
            style={{ backgroundColor: labelColor || '#ccc' }}
          >
            {name}
          </div>
        </div>
      )
    );
  };

  render() {
    const {
      avatarDirection,
    } = this.props;
    const { mode, currentText } = this.state;

    const hintText = window.outerWidth < 576
      ? 'Tap to continue' : 'Press enter to continue';

    const regex = new RegExp(/<pause for=\d+>/g);
    const parsedText = currentText.split(regex).join(' ');

    return (
      <section
        className="dialog-box-container"
        onTouchStart={this.changeBoxState}
      >
        {this.renderAvatar(avatarDirection)}

        <div className="dialog-box">
          {mode === 'typing' ? (
            <div ref={this.dialogBoxRef} />
          ) : (
            <div ref={this.dialogBoxRef} mode="flat">
              {parsedText}
            </div>
          )}
          <span className="key-hint">{hintText}</span>
        </div>
      </section>
    );
  }
}

DialogBox.propTypes = {
  // Avatar is the image that will be shown at the top of
  // the dialog box. It represents the person that is
  // speaking.
  avatar: PropTypes.string,

  // Name of the character that is speaking.
  name: PropTypes.string,

  // Text is an array with all the phrases that the
  // character is going to say. How they are going to
  // be displayed depends on the user's interaction:
  //
  // * typing: if the user does not press keys or touches
  //   the screen's device (in case of touch screens), the
  //   paragraphs will be displayed letter be letter as if
  //   they are being typed in real time. When a paragraph
  //   ends, it will be erased and the next paragraph will
  //   start to be typed in the dialog box.
  //
  // * flat: when the user interrupts the typing effect by
  //   pressing <enter> or arrow keys (or touches
  //   the screen's device in case of touch screens), the
  //   typing effect is temporarily suspended. The entire
  //   paragraph is displayed at once in the dialog box and
  //   a hint will be displayed telling the users they need
  //   to interact again to let the dialog continue. Then,
  //   the next paragraph will be shown using the typing
  //   effect once again.
  text: PropTypes.array.isRequired,

  // Below the avatar there is a label with the name of
  // the speaker. The labelColor property is the background
  // color of this label. It accepts all css formats
  // regarding colors, like strings (`red`, `blue`, etc),
  // HEX (#f4dd1d, for example), RGB and so on.
  labelColor: PropTypes.string,

  // Function that will be executed when the entire dialog
  // finishes. It means that all the paragraphs of the text
  // were displayed.
  speechFinished: PropTypes.func,

  // During a dialog, the avatar may be shown in the left
  // of in the right of the screen (in mobile devices they
  // are always at the top, regardless of the value of this
  // property). The valid values are `left` and `right`.
  //
  // When avatar is not set, this attribute does not change
  // the component.
  avatarDirection: PropTypes.string,
};

export default DialogBox;
