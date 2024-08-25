import React, {useState, useEffect, useRef} from 'react';
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import styles from './ChatComponent.module.scss';
import {ISSUE_URL, CHAT_URL} from "../../../config/host-config";
import {useModal} from "../../../pages/common/ModalProvider";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

const ChatComponent = ({issueId, type}) => {
    const [stompClient, setStompClient] = useState(null);
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [categorySelected, setCategorySelected] = useState(false);
    const [adminStarted, setAdminStarted] = useState(false);
    const chatBoxRef = useRef(null);
    const {closeModal} = useModal();
    const [previewImages, setPreviewImages] = useState([]);

    useEffect(() => {
        const socket = new SockJS(CHAT_URL);
        const stompClient = Stomp.over(() => socket);

        stompClient.connect({}, (frame) => {
            console.log('Connected:', frame);
            setConnected(true);

            stompClient.subscribe(`/topic/messages/${issueId}`, (message) => {
                const parsedMessage = JSON.parse(message.body);
                console.log('Received message:', parsedMessage);
                if (parsedMessage.sender === 'admin') {
                    setAdminStarted(true);
                }
                showMessage(parsedMessage);
            });

        }, (error) => {
            alert('채팅 서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
            quitIssueHandler();
            console.error('Connection error:', error);
            setConnected(false);
        });

        setStompClient(stompClient);

        return () => {
            if (stompClient) stompClient.disconnect();
        };
    }, [issueId]);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            quitIssueHandler(); // 채팅 종료 및 자동 저장 로직 호출
            event.returnValue = 'caution!'; // 사용자에게 경고 메시지 표시
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [stompClient, connected]);


    const showMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const updateIssueCategory = async (selectedCategory, issueId) => {
        try {
            await fetch(ISSUE_URL + `/category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    issueId: issueId,
                    issueCategory: selectedCategory,
                }),
            });
        } catch (e) {
            console.error('Error:', e);
        }
    };

    const handleCategorySelect = (selectedCategory) => {
        setCategorySelected(true);
        updateIssueCategory(selectedCategory, issueId).then(r => {
            sendMessage({
                content: `Issue Category Selected: ${selectedCategory}`,
                sender: type
            });
        });
    };

    const handleFileChange = (event) => {
        const files = event.target.files;


        const fileArray = Array.from(files).slice(0, 3); // 3개로 제한

        if (fileArray.length > 3) {
            alert('최대 3개까지 업로드 가능합니다.');
            return;
        }

        const previewUrls = fileArray.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(previewUrls)
            .then(urls => {
                setPreviewImages(urls);
                setSelectedFiles(fileArray);
            })
            .catch(error => console.error('Error creating preview:', error));
    };

    const sendMessage = (messageOverride = null) => {
        const messageToSend = messageOverride || {
            content: messageInput.trim().slice(0, 100), // 글자 수 제한
            issueId: issueId,
            sender: type
        };

        if (!messageToSend.content || messageToSend.content.trim() === '') {
            console.error('Message content is empty or too long.');
            return;
        }

        if (connected && stompClient) {
            stompClient.send(`/app/sendMessage/${issueId}`, {}, JSON.stringify(messageToSend));
            if (!messageOverride) setMessageInput('');
        } else {
            console.error('STOMP client is not connected.');
        }
    };

    const fetchBase64Image = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    const sendFiles = async () => {
        if (selectedFiles.length === 0) {
            console.error('No files selected.');
            return;
        }

        const formData = new FormData();
        console.log('Selected files:', selectedFiles);
        for (const file of selectedFiles) {
            formData.append('files', file);
        }
        formData.append('issueId', issueId);
        console.log('Form data:', formData);
        try {
            const response = await fetch(ISSUE_URL + '/uploadPhoto', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload images.');
            }

            const fileUrls = await response.json();
            console.log('File URLs:', fileUrls);
            for (const url of fileUrls) {
                sendMessage({
                    content: url, // 파일 URL을 메시지로 전송
                    sender: type
                });
            }

            setSelectedFiles([]); // 파일 선택 초기화
            setPreviewImages([]); // 미리보기 초기화
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };


    const saveChatToDatabase = async (done) => {
        const textMessages = messages.filter(msg => !msg.content.startsWith('https://s3.ap-northeast-2.amazonaws.com/foodietree.shop'))
            .map(msg => `${msg.sender === 'customer' ? 'Customer' : 'Admin'}: ${msg.content}`).join('\n');

        try {
            const response = await fetch(ISSUE_URL + `/saveText`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    issueId: issueId,
                    issueText: textMessages,
                    done: done,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save chat to the database.');
            }

        } catch (e) {
            console.error('Error saving chat:', e);
            alert('Failed to save chat.');
        }
    };

    const sendDoneMessage = (messageOverride = null) => {
        const messageToSend = messageOverride || {
            content: '채팅이 끝났습니다.', // 글자 수 제한
            issueId: issueId,
            sender: type
        };

        if (connected && stompClient) {
            stompClient.send(`/app/sendMessage/${issueId}`, {}, JSON.stringify(messageToSend));
            if (!messageOverride) setMessageInput('');
        } else {
            console.error('STOMP client is not connected.');
        }
    }

    const solveIssueHandler = () => {
        const done = "solved";
        let messageContent = `고객이 문의가 해결되어 채팅을 종료했습니다.`;
        if (type === 'customer') {
            messageContent = `문제가 해결 되었다니 다행이네요!`+ '\n' + `궁금한 점이나 다른 문의사항이 있으시면` + '\n' + `언제든지 문의해주세요 :)`;
        }
        sendMessage({content: messageContent, sender: "manger"});
        setConnected(false);
        saveChatToDatabase(done).then(() => {
            alert("이슈가 해결되어 채팅을 종료합니다.");
            closeModal();
        });
    };

    const quitIssueHandler = () => {
        const done = "cancel";
        let messageContent = `고객이 채팅 끝내기를 선택했습니다.`;
        if (type === 'customer') {
            messageContent = `채팅창을 닫을게요`+ '\n' + `궁금한 점이나 다른 문의사항이 있으시면` + '\n' + `언제든지 문의해주세요 :)`;
        }
        sendMessage({content: messageContent, sender: "manger"});
        setConnected(false);
        saveChatToDatabase(done).then(() => {
            alert("채팅을 종료합니다.");
            closeModal();
        });
    };

    if (!categorySelected && type === 'customer') {
        return (
            <div className={styles.chatContainer}>
                <h2 className={styles.chatTitle}>문의 유형을 선택해주세요!</h2>
                <div className={styles.categorySelection}>
                    <button className={styles.categoryBtn} onClick={() => handleCategorySelect('상품')}>상품 관련 문의에요
                    </button>
                    <button className={styles.categoryBtn} onClick={() => handleCategorySelect('업체')}>업체 관련 문의에요
                    </button>
                    <button className={styles.categoryBtn} onClick={() => handleCategorySelect('시스템')}>시스템 관련 문의에요
                    </button>
                    <button className={styles.categoryBtn} onClick={() => handleCategorySelect('기타')}>그 외의 문의에요</button>
                </div>
                <div className={styles.quitChatBtn} onClick={() => quitIssueHandler()}>채팅 나가기</div>
            </div>
        );
    }

    if (!adminStarted && type === 'customer') {
        return (
            <div className={styles.chatContainer}>
                <div className={styles.loading}>
                    고객님을 도와드릴 상담 직원이 곧 도착할 거예요!
                    <br/>
                    잠시만 기다려주세요~ 😊
                </div>
                <img
                    src="/assets/img/loading.gif"
                    alt="Loading..."
                    className={styles.loadingGif} // GIF에 적용할 스타일을 위해 CSS 클래스 추가
                />
                <div className={styles.quitChatBtn} onClick={() => quitIssueHandler()}>채팅 나가기</div>
            </div>
        );
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    };

    const handleSend = async () => {
        if (selectedFiles.length > 0) {
            // If images are selected, upload and send them
            await sendFiles();
        } else if (messageInput.trim() !== '') {
            // If no images but text is entered, send the text message
            sendMessage();
        }
    };


    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatBoxBody} ref={chatBoxRef}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`${styles.message} ${
                            msg.sender === type ? styles.myMessage : styles.otherMessage
                        } ${msg.sender === 'manger' && styles.mangerMessage}`}
                    >
                        {msg.content.startsWith('http') ? ( // URL로 시작하는 경우 이미지로 표시
                            <img src={msg.content} alt="Uploaded" className={styles.chatImage}/>
                        ) : (
                            msg.content
                        )}
                    </div>
                ))}
            </div>
            <div className={styles.chatBoxFooter}>
                <div className={styles.inputContainer}>

                    <div className={styles.fileUpload}>
                        <label className={styles.uploadLabel}>
                            <span className={styles.plusButton}><FontAwesomeIcon icon={faPlus}/></span> {/* + 버튼 */}
                            <input
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className={styles.fileInput} // 숨겨진 파일 입력
                            />
                        </label>
                    </div>
                    <input
                        className={styles.messageInput}
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyUp={handleKeyPress} // 엔터 키 이벤트 핸들러 추가
                        placeholder="Type your message..."
                        disabled={!connected || (type === 'customer' && !adminStarted)}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!connected || (type === 'customer' && !adminStarted)}
                    >
                        전송
                    </button>
                </div>
                <div className={styles.imagePreviewContainer}>
                    {previewImages.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`preview-${index}`}
                            className={styles.previewImage}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.chatButtonBox}>
                <div>
                    <button onClick={solveIssueHandler}>
                        해결 완료
                    </button>
                </div>
                <div>
                    <button onClick={quitIssueHandler}>
                        채팅 끝내기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;