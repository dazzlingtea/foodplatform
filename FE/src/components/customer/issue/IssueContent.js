import React from 'react';
import styles from './IssueContent.module.scss';
import IssueQuestions from "./IssueQuestions";
const IssueContent = ({reservationDetail, issueId}) => {
    return (
        <div className={styles.issueContainer}>
            <h1 className={styles.helpHeader}>무엇을 도와드릴까요?</h1>
            <h2 className={styles.helpDesc}> 문의에 따라 질문을 선택해주세요 </h2>
            <div className={styles.line}></div>
            <IssueQuestions reservationDetail={reservationDetail} issueId={issueId}/>
        </div>
    );
};

export default IssueContent;