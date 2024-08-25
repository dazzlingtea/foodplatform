import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { checkAuthFn } from "../../utils/authUtil";

const SearchInput = () => {
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const [word, setWord] = useSearchParams();
    const [placeholder, setPlaceholder] = useState("이곳에 음식점 혹은 위치를 검색해보세요!");

    useEffect(() => {
        inputRef.current.value = word && word.get("q");

        const updatePlaceholder = () => {
            if (window.innerWidth < 400) {
                setPlaceholder("검색");
            } else {
                setPlaceholder("이곳에 음식점 혹은 위치를 검색해보세요.");
            }
        };

        updatePlaceholder(); // 초기 설정
        window.addEventListener("resize", updatePlaceholder); // 화면 크기 변경 감지

        return () => {
            window.removeEventListener("resize", updatePlaceholder); // 이벤트 리스너 정리
        };
    }, []);

    const onClickHandler = () => {
        checkAuthFn(() => window.location.replace(`/search?q=${inputRef.current.value}`), navigate);
    }

    const onKeyHandler = (e) => {
        if (e.keyCode === 13) {
            onClickHandler();
        }
    }

    return (
        <input ref={inputRef} type="text" onKeyUp={onKeyHandler} placeholder={placeholder}
        />
    );
};

export default SearchInput;