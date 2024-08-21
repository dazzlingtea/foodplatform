import React from 'react';
import ChatComponent from "./ChatComponent";

const AdminIssueChat = ({issueId}) => {
    const handleReceiveMessage = (message) => {
        // 특정 issueId에 대한 메시지 처리 로직 추가 가능
        console.log('Received in IssueChatComponent:', message);
    };

    return (
        <ChatComponent
            issueId={issueId}
            onReceiveMessage={handleReceiveMessage}
            type={'admin'}
        />
    );
};

export default AdminIssueChat;