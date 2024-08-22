import React from 'react';
import IssueReview from "./IssueReview";

const AdminIssueReviewModal = ({issueId, issueDetail, reservationDetail, issuePhotos}) => {
    return (
        <>
            <IssueReview issueId={issueId} issueDetail={issueDetail} reservationDetail={reservationDetail} issuePhotos={issuePhotos}/>
        </>
    );
};

export default AdminIssueReviewModal;