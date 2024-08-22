import React, {useEffect, useState} from 'react';
import styles from './RegisterStep.module.scss';
import StoreRegister from "./StoreRegister";
import ProductRegister from "./ProductRegister";
import WaitingApproval from "./WaitingApproval";
import {authFetch} from "../../utils/authUtil";
import {useLocation, useNavigate} from "react-router-dom";
import {STORE_URL} from "../../config/host-config";
import RegisterStepSpinner from "./RegisterStepSpinner";

const STEPS = [
    {state: 'ALREADY_APPROVED', name: '가입 완료'},
    {state: 'STEP_ONE', name: '스토어 등록'},
    {state: 'STEP_TWO', name: '스페셜팩 등록'},
    {state: 'PENDING_APPROVAL', name: '승인 대기'},
  ];

const RegisterStep = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state added
  const [showSpinner, setShowSpinner] = useState(true); // Skeleton visibility state
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkApprovalState = async () => {
      try {
        const response = await authFetch(`${STORE_URL}/check/approval`, {
          method: 'GET'
        });
        const state = await response.text();
        // 현재 단계 계산
        const stepIndex = STEPS.findIndex(step => step.state === state);
        setCurrentStep(stepIndex >= 0 ? stepIndex : 0);
        setLoading(false);
      } catch (error) {
        console.error('등록요청시 state 확인 error:', error);
        setLoading(false);
      }
    }
    checkApprovalState();
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowSpinner(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [loading]);
  useEffect(() => {
    if (location.pathname === '/store/approval/p') {
      setCurrentStep(2);
    }
  }, [location.pathname]);

  const onSetStep = (step) => {
    setCurrentStep(step);
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        alert('이미 승인받으셨습니다.')
        navigate('/store');
        break;
      case 1:
        return <StoreRegister />;
      case 2:
        return <ProductRegister onSetStep={onSetStep}/>;
      case 3:
        return <WaitingApproval/>;
      default:
        navigate('/main');
    }
  };

  return (
    <div className={styles.bodyContainer}>
      { showSpinner ? (
        <RegisterStepSpinner />
      ) : (
        <>
          <div className={styles.progressContainer}>
            {STEPS.map((step, index) => (
              <div
                key={index}
                className={`${styles.step} 
                          ${index < currentStep ? styles.completed : ''} 
                          ${index === currentStep ? styles.current : ''}`}
              >
                <div className={styles.progress}>
                  <div className={styles.circle}>
                    {index === currentStep && <span className={styles.checkmark}>✓</span>}
                  </div>
                  { index !== (STEPS.length - 1) && <hr className={styles.line}/> }
                </div>
                <span className={styles.label}>{step.name}</span>
              </div>
            ))}
          </div>
          { renderStep() }
        </>
    )}
    </div>
  );
}

export default RegisterStep;