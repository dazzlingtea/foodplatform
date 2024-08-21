import React from 'react';
import IssueReview from "./IssueReview";

const AdminIssueReviewModal = ({issueId, issueDetail, reservationDetail, issuePhotos}) => {
    console.log('issuePhotossssssss', issuePhotos);
    return (
        <>
            <IssueReview issueId={issueId} issueDetail={issueDetail} reservationDetail={reservationDetail} issuePhotos={issuePhotos}/>
        </>
    );
};

export default AdminIssueReviewModal;