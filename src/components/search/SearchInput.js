import React, {useEffect, useRef} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {checkAuthFn} from "../../utils/authUtil";

const SearchInput = () => {
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const [word, setWord] = useSearchParams();

    useEffect(() => {
        inputRef.current.value = word && word.get("q");
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
            <input ref={inputRef} type="text" onKeyUp={onKeyHandler} placeholder="여기에 음식점 혹은 위치를 검색해보세요." />

    );
};

export default SearchInput;