import React from 'react';
import styles from './IssueImage.module.scss';
const IssueImage = () => {
    return (
        <div className={styles.issueImageContainer}>
            <img src="/assets/img/customerSupport.jpg" alt="issue"/>
        </div>
    );
};

export default IssueImage;