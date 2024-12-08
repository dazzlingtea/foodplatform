import React from 'react';
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from './StoreRegisterForm.module.scss';

const ErrorSpan = ({message}) => {
  return (
    <span className={styles.error}>
      <FontAwesomeIcon
        icon={faExclamationTriangle}
        className={styles.warning}
      />
      {' ' + message}
    </span>
  );
};

export default ErrorSpan;