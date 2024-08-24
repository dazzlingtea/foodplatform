import React, { useEffect, useState } from 'react';
import { getUserEmail, getToken, getRefreshToken } from '../../utils/authUtil';
import { FAVORITESTORE_URL } from '../../config/host-config';
import styles from './FavAreaSelector.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const FavAreaSelector = ({ onAreaSelect }) => {
  const [areas, setAreas] = useState([]);
  const [customerId, setCustomerId] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);

  useEffect(() => {
    // 세션 스토리지 저장
    const storedArea = sessionStorage.getItem('selectedArea');
    if (storedArea) {
      // console.log('Loaded from sessionStorage:', storedArea);
      setSelectedArea(storedArea);
    }
  }, []);

  useEffect(() => {
    const fetchCustomerId = async () => {
      try {
        const id = await getUserEmail();
        setCustomerId(id);
      } catch (error) {
        // console.error('Error fetching customer ID:', error);
      }
    };

    fetchCustomerId();
  }, []);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch(`${FAVORITESTORE_URL}/areas`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
            'refreshToken': getRefreshToken(),
          },
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok. Status: ${response.status}`);
        }

        const data = await response.json();
        setAreas(data);

        // 세션 스토리지에 storedArea가 저장되어 있는지 확인
        // 없다면 0번째 preferredArea 
        const storedArea = sessionStorage.getItem('selectedArea');
        if (storedArea) {
          setSelectedArea(storedArea);
          // console.log('Default area from sessionStorage:', storedArea);
        } else if (data.length > 0) {
          const defaultArea = data[0].preferredArea;
          setSelectedArea(defaultArea);
          sessionStorage.setItem('selectedArea', defaultArea);
          // console.log('Default area saved to sessionStorage:', defaultArea);
        }

      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };

    fetchAreas();
  }, []);

  useEffect(() => {
    if (selectedArea !== null) {
      onAreaSelect(selectedArea);
      // 선택된 세션스토리지 업데이트
      sessionStorage.setItem('selectedArea', selectedArea);
      // console.log('Selected area saved to sessionStorage:', selectedArea);
    }
  }, [selectedArea, onAreaSelect]);

  const handleToggle = () => {
    setIsExpanded(prev => !prev);
  };

  const handleAreaClick = (area) => {
    setSelectedArea(area.preferredArea);
    setIsExpanded(false);
  };

  const selectedAreaDetails = areas.find(area => area.preferredArea === selectedArea);

  return (
    <div className={styles.container}>
      <h2 className={styles.title} onClick={handleToggle}>
        <FontAwesomeIcon icon={faLocationDot} /> {selectedAreaDetails ? selectedAreaDetails.preferredArea : ' 현재 등록된 주소 '} {isExpanded ? ' ▴ ' : ' ▾ '}
      </h2>
      <ul className={`${styles.areaList} ${isExpanded ? styles.expanded : ''}`}>
        {areas.map((area) => (
          <li
            key={area.id}
            className={styles.areaItem}
            onClick={() => handleAreaClick(area)}
          >
            <span className={styles.areaName}>{area.preferredArea}</span>
            {area.alias && <span className={styles.areaAlias}>({area.alias})</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavAreaSelector;
