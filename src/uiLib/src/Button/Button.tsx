import React from 'react';

import styles from './Button.scss';

export const Button = ({...rest}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button {...rest} className={`${styles.button} ${rest.className || ''}`}>
      {rest.children}
    </button>
  )
}
