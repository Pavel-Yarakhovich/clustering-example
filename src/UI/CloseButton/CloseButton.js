import React from 'react';

import styles from './CloseButton.module.css';

const CloseButton = ({ onClick }) => {
  return <div className={styles.cross} onClick={onClick}></div>;
};

export default CloseButton;
