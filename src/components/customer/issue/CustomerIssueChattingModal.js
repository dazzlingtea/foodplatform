import React from 'react';
import ChatComponent from "../../admin/issue/ChatComponent";
import CustomerIssueChat from "./CustomerIssueChat";

const CustomerIssueChattingModal = ({issueId}) => {
    return (
            <CustomerIssueChat issueId={issueId}/>
    );
};

export default CustomerIssueChattingModal;