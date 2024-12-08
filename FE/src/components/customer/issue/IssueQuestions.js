import React, {useState} from 'react';
import styles from './IssueQuestions.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faAngleUp} from "@fortawesome/free-solid-svg-icons";
import {useModal} from "../../../pages/common/ModalProvider";
import {getRefreshToken, getToken, getUserEmail} from "../../../utils/authUtil";
import {ISSUE_URL} from "../../../config/host-config";

const IssueQuestions = ({reservationDetail}) => {
    const [activeQuestion, setActiveQuestion] = useState(null);
    const {openModal} = useModal();
    const handleQuestionClick = (question) => {
        setActiveQuestion(activeQuestion === question ? null : question);
    };

    const handleIssueChatting = () => {
        // 이슈 테이블에 이슈 추가 post 요청
        makeIssue().then(r => {});
    }

    const makeIssue = async () => {
        try {
            const res = await fetch(ISSUE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken(),
                    'refreshToken': getRefreshToken()
                },
                body: JSON.stringify({
                    customerId: getUserEmail(),
                    reservationId: reservationDetail.reservationId,
                }),
            });

            if (!res.ok) {
                const errorMessage = await res.text();
                alert(errorMessage);
                return null;
            }

            const issueId = await res.json();

            openModal('customerIssueChatting', {issueId});
        }catch (e) {
            console.error('Error:', e);
        }
    }

    return (
        <div className={styles.questionContainer}>
            <div>
                <div className={styles.questionBox} onClick={() => handleQuestionClick(1)}>
                    <div>
                        예약을 취소하고 싶어요
                    </div>
                    {activeQuestion === 1 ? <FontAwesomeIcon icon={faAngleUp}/> : <FontAwesomeIcon icon={faAngleDown}/>}
                </div>
                {activeQuestion === 1 && (
                    <div className={styles.answers}>
                        <p>예약을 취소하고 싶으시면, 마이페이지에서 하실 수 있어요! <br/> 하지만 픽업 시간이 지나기 전에만 가능하다는 점, 꼭 기억해 주세요. <br/>특히 픽업 시간이 1시간 이하로 남았을 때는 취소 수수료가 생길 수 <br/>있으니
                            주의해 주시면 좋겠어요!</p>
                    </div>
                )}
            </div>

            <div>
                <div className={styles.questionBox} onClick={() => handleQuestionClick(2)}>
                    <div>
                        스페셜 박스에 무엇이 들었는지 궁금해요
                    </div>
                    {activeQuestion === 2 ? <FontAwesomeIcon icon={faAngleUp}/> :
                        <FontAwesomeIcon icon={faAngleDown}/>}
                </div>
                {activeQuestion === 2 && (
                    <div className={styles.answers}>
                        <p>스페셜 박스 안에 뭐가 들었는지 궁금하시죠? <br/>사실 가게마다 구성이 다 달라서 저희도 매번 궁금해요! <br/>그래도 궁금하시다면<br/>리뷰 커뮤니티에서 다른 분들이
                            받은 걸 한번 구경해 보세요. <br/>어떤 맛있는 것들이 들어있을지 기대되네요!<br/>
                        여기 리뷰 커뮤니티 링크가 있어요!
                        </p>
                    </div>
                )}
            </div>


            <div>
                <div className={styles.questionBox} onClick={() => handleQuestionClick(3)}>
                    <div>
                        취소수수료가 궁금해요
                    </div>
                    {activeQuestion === 3 ? <FontAwesomeIcon icon={faAngleUp}/> :
                        <FontAwesomeIcon icon={faAngleDown}/>}
                </div>
                {activeQuestion === 3 && (
                    <div className={styles.answers}>
                        <p>취소 수수료는 픽업 시간이 1시간 이하로 남았을 때 생기는데요,<br/> 예약 금액의 50%가 부과돼요.<br/> 이 수수료는 좋은 일에 쓰여요! 바로 나무 심기
                            모금에요.<br/>
                            환경을 위해 작은 도움을 주신다고 생각해 주시면 감사하겠습니다!</p>
                    </div>
                )}
            </div>

            <div>
                <div className={styles.questionBox} onClick={() => handleQuestionClick(4)}>
                    <div>
                        요청사항이 있어요
                    </div>
                    {activeQuestion === 4 ? <FontAwesomeIcon icon={faAngleUp}/> :
                        <FontAwesomeIcon icon={faAngleDown}/>}
                </div>
                {activeQuestion === 4 && (
                    <div className={styles.answers}>
                        <p>요청사항이 있으시면 가게에 직접 말씀해 주세요! <br/>하지만 스페셜 박스는 미리 정해진 구성이라 <br/>모든 요청을 다 들어드리기 어렵다는 점, <br/>이해해
                            주시면 감사하겠습니다. <br/>너무
                            과한 요청은 가게에서 어려워할 수도 있어요!</p>
                    </div>
                )}
            </div>

            <div>
                <div className={styles.questionBox} onClick={handleIssueChatting}>
                    <div>
                        그 외 문의가 있어요
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IssueQuestions;
