import React, { useEffect, useState } from 'react';
import { getUserEmail, getToken, getRefreshToken } from '../../utils/authUtil';
import { FAVORITESTORE_URL } from '../../config/host-config';
import styles from './FavAreaSelector.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { getCurrentLocation, reverseGeocode } from '../../utils/locationUtil'; // Import location utilities

const FavAreaSelector = ({ onAreaSelect }) => {
  const [areas, setAreas] = useState([]);
  const [customerId, setCustomerId] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    // 세션 스토리지 저장
    const storedArea = sessionStorage.getItem('selectedArea');
    if (storedArea) {
      // console.log('Loaded from sessionStorage:', storedArea);
      setSelectedArea(storedArea);
    }
    fetchAreas();
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
      if (!data.length && !storedArea) {
        // If no areas and no storedArea, fetch current location
        fetchCurrentLocation();
      } else if (storedArea) {
        setSelectedArea(storedArea);
          // console.log('Default area from sessionStorage:', storedArea);
      } else if (data.length > 0) {
        const defaultArea = truncateAddress(data[0].preferredArea);
        setSelectedArea(defaultArea);
        sessionStorage.setItem('selectedArea', defaultArea);
          // console.log('Default area saved to sessionStorage:', defaultArea);
      }

    } catch (error) {
      console.error('Error fetching areas:', error);
      fetchCurrentLocation();
    }
  };

  const fetchCurrentLocation = async () => {
    setLoadingLocation(true);
    try {
      const { lat, lng } = await getCurrentLocation();
      const address = await reverseGeocode(lat, lng);
      const truncatedAddress = truncateAddress(address);
      setSelectedArea(truncatedAddress);
      sessionStorage.setItem('selectedArea', truncatedAddress);
    } catch (error) {
      console.error('Error fetching current location:', error);
      setSelectedArea('현재 위치 불러오기 실패');
    } finally {
      setLoadingLocation(false);
    }
  };

  const truncateAddress = (address) => {
    const parts = address.split(' ');
    if (parts.length >= 3) {
      return `${parts[0]} ${parts[1]} ${parts[2]}`;
    }
    return address; 
  };

  useEffect(() => {
    if (selectedArea !== null) {
      // onAreaSelect(selectedArea);
      // 선택된 세션스토리지 업데이트
      sessionStorage.setItem('selectedArea', selectedArea);
      // console.log('Selected area saved to sessionStorage:', selectedArea);
    }
  }, [selectedArea]);
  // }, [selectedArea, onAreaSelect]);

  const handleToggle = () => {
    setIsExpanded(prev => !prev);
  };

  const handleAreaClick = (area) => {
    const truncated = truncateAddress(area.preferredArea);
    setSelectedArea(truncated);
    setIsExpanded(false);
  };

  const selectedAreaDetails = areas.find(area => truncateAddress(area.preferredArea) === selectedArea);

  return (
    <div className={styles.container}>
      <h2 className={styles.title} onClick={handleToggle}>
        <FontAwesomeIcon icon={faLocationDot} /> 
        {loadingLocation ? '현재 위치 불러오는 중...' : 
          (selectedAreaDetails ? selectedAreaDetails.preferredArea : (areas.length > 0 ? '현재 등록된 주소' : selectedArea))}
        {isExpanded ? ' ▴ ' : ' ▾ '}
      </h2>
      {areas.length > 0 && (
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
      )}
    </div>
  );
};

export default FavAreaSelector;
