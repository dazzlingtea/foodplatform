import React, {useEffect, useRef, useState} from 'react';
import style from "./AddFavFoodModal.module.scss";
import {useModal} from "../../common/ModalProvider";
import {categoryImgList} from "../../../utils/img-handler";

const categoriesInfo = [
    {name: '한식', image: "/assets/img/korean.jpg", checked: false},
    {name: '중식', image: "/assets/img/chinese.jpg", checked: false},
    {name: '양식', image: "/assets/img/western.jpg", checked: false},
    {name: '일식', image: "/assets/img/japanese.jpg", checked: false},
    {name: '디저트', image: "/assets/img/dessert.jpg", checked: false},
    {name: '카페', image: "/assets/img/cafe.jpg", checked: false},
    {name: '기타', image: "/assets/img/etc.jpg", checked: false},
];

const AddFavFoodModal = ({favList, addFavFoodFn}) => {
    const [category, setCategory] = useState([]);
    const { closeModal } = useModal();

    useEffect(() => {
        console.log(favList)
        categoriesInfo.map(e => e.checked = false);
        categoriesInfo.map(e => {
            if (favList.find(item => item.preferredFood === e.name)) {
                e.checked = true;
            }
        });
        setCategory([...categoriesInfo]);
    }, [favList]);

    const clickHandler = (item) => {
        if (item.checked) return;
        if (category.filter(e => e.checked).length === 3) {
            alert('최대 3개까지 선택가능합니다!');
            closeModal();
            return;
        }
        setCategory(prev => prev.map(e => {
            if (e.name === item.name)
                e.checked = true;
            return e;
        }));
        addFavFoodFn(item);
    }
    return (
        <div>
            <ul className={style["fav-list"]}>
                {
                    category.map((item) =>
                        <li
                            key={item.name}
                            className={item.checked ? style.border : undefined}
                            onClick={() => clickHandler(item)}
                        >
                            <div className={style["img-box"]}>
                                <img src={categoryImgList[item.name]} alt=""/>
                            </div>
                            <span>{item.name}</span>
                        </li>
                    )
                }
            </ul>
        </div>
    );
};

export default AddFavFoodModal;