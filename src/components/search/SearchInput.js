import React, {useEffect, useRef} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import styles from "./SearchInput.module.scss";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
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
        <div className={styles["input-box"]}>
            <div>
                <button onClick={onClickHandler}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                <input ref={inputRef} type="text" onKeyUp={onKeyHandler}/>
            </div>
        </div>
    );
};

export default SearchInput;