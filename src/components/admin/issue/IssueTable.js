import React from 'react';
import IssueSummary from "./IssueSummary";
import styles from './IssueTable.module.scss';
import ChatComponent from "./ChatComponent";
import ChattingList from "./ChattingList";

const IssueTable = () => {

    return (
        <div className={styles.tableSection}>
            <div className={styles.chatListContainer}>
                <ChattingList/>
            </div>
        </div>
    );
};

export default IssueTable;