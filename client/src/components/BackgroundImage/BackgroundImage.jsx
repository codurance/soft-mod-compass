import React from 'react';
import PropTypes from 'prop-types';

export default function BackgroundImage({ imageClass, testId }) {
  return <div className={imageClass} data-testid={testId} />;
}

BackgroundImage.propTypes = {
  testId: PropTypes.string,
  imageClass: PropTypes.string.isRequired,
};

BackgroundImage.defaultProps = {
  testId: null,
};
