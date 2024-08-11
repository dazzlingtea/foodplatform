import React from 'react';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import style from "./AddFavFoodBtn.module.scss";
import {useModal} from "../../../../pages/common/ModalProvider";
import {authFetch} from "../../../../utils/authUtil";
import {CUSTOMER_URL} from "../../../../config/host-config";

const AddFavFoodBtn = ({ favList, set }) => {

    const { openModal } = useModal();

    const openModalHandler = () => {
        openModal("addFavFood", {favList, addFavFoodFn });
    }

    const addFavFoodFn = async ({name, checked, image}) => {
        if (checked) return;
        await addFoodFetch("food", name);
        set(prev => [...prev, {foodImage: image, preferredFood: name}]);
    }

    const addFoodFetch = async (type, value) => {
        const payload = {
            type,
            value
        }
        const res = await authFetch(CUSTOMER_URL + `/edit`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        });
        if (res.ok) {
            alert("추가되었습니다");
        } else {
            const errorText = await res.text();
            console.error('add failed:', errorText);
        }
    }

    return (
        <div className={style.box} onClick={openModalHandler}>
            <FontAwesomeIcon className={style["plus-mark"]} icon={faPlus} />
        </div>
    );
};

export default AddFavFoodBtn;