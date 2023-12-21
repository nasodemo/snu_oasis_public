"use client"

import React from 'react';
import PropTypes from 'prop-types';
import styles from './styledbutton.module.css'

const click = () => {
  
};

const StyledButton = ({ children }: any) => {
  return (
    <button onClick={click} className={styles.styledbutton}>
      {children}
    </button>
  //   <div className={styles.styledbutton}>
  //   {children}
  // </div>
  );
}

StyledButton.propTypes = {
  children: PropTypes.node.isRequired,  
};

export default StyledButton;