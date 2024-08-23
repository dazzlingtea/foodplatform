import React from 'react';
import ChatComponent from "./ChatComponent";
import IssueTable from "./IssueTable";
import styles from './IssueSection.module.scss';
const IssueSection = () => {
    return (
        <div className={styles.issueSection}>
            <IssueTable/>
            <img className={styles.issueSectionImg} src={"/assets/img/customerService2.jpg"} alt="customerSupport"/>
        </div>
    );
};

export default IssueSection;