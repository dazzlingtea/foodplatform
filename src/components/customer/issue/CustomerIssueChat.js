import React from 'react';
import ChatComponent from "../../admin/issue/ChatComponent";

const CustomerIssueChat = ({issueId}) => {
    const handleReceiveMessage = (message) => {
        // 지원 채팅에 대한 메시지 처리 로직 추가 가능
        console.log('Received in SupportChatComponent:', message);
    };

    return (
        <ChatComponent
            issueId={issueId}
            onReceiveMessage={handleReceiveMessage}
            type={'customer'}
        />
    );
};

export default CustomerIssueChat;