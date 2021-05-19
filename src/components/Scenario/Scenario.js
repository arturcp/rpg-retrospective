import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const scenario = (props) => {
  const { scene } = props;
  return (
    <section className={`scenario ${scene}`}>
      {props.children}
    </section>
  );
};

scenario.propTypes = {
  // Comma-separated classes to be used in the scenario.
  // Apart from these classes, there is a default class
  // that will be added as well: `scenario`.
  scene: PropTypes.string,
};

export default scenario;
