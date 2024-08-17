

if(type === 'customer') {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                initializeMap(latitude, longitude);
                setLoading(false); // 로딩 완료
            },
            () => {
                initializeMap(37.555183, 126.936883); // 중앙정보처리학원 신촌로176
                setLoading(false); // 로딩 완료
            }
        );
    } else {
        initializeMap(37.555183, 126.936883); // Geolocation을 지원하지 않는 경우
        setLoading(false); // 로딩 완료
    }
}