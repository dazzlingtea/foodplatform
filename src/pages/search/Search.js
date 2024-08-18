import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import SearchList from "../../components/search/SearchList";
import Skeleton from "../../components/search/Skeleton";
import {checkAuthFn, checkAuthToken} from "../../utils/authUtil";

const Search = () => {
    const [word, setWord] = useSearchParams();
    const skeletonRef = useRef();
    const [pageNo, setPageNo] = useState(1);
    const [storeList, setStoreList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFinish, setIsFinish] = useState(false);
    const [skeletonCnt, setSkeletonCnt] = useState(20);
    const [initLoading, setInitLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        const initFetch = async () => {
            setInitLoading(true);
            const data = await fetchSearch(1);
            if (data === null) return ;
            setStoreList(data.result);
            setIsFinish(data.result.length >= data.totalCnt);
            setInitLoading(false);
            setPageNo(2);
        };
        checkAuthToken(navigate);
        initFetch();
    }, [word]);

    useEffect(() => {
        const observer = new IntersectionObserver(async (entries) => {
            if (!entries[0].isIntersecting || loading || isFinish) return;
            await loadSearchedStores();
        }, {rootMargin: '100px', threshold: 0.1});

        if (skeletonRef.current) observer.observe(skeletonRef.current);
        return () => {
            if (skeletonRef.current) observer.disconnect();
        }
    }, [loading, pageNo, isFinish]);

    const loadSearchedStores = async () => {
        if (isFinish || loading || initLoading) return;

        setLoading(true);
        const {result: loadedList, totalCnt} = await fetchSearch(pageNo);
        console.log(loadedList)
        const updatedList = [...storeList, ...loadedList];
        setStoreList(updatedList);
        setPageNo(prev => prev + 1);
        setIsFinish(totalCnt === updatedList.length);
        setLoading(false);

        const restListLen = totalCnt - updatedList.length;
        const skeletonCnt = Math.min(20, restListLen);
        setSkeletonCnt(skeletonCnt);
    };

    const fetchSearch = async (pageNo) => {
        const response = await fetch(`/search?pageNo=${pageNo}&keyword=${word.get('q')}`);
        if (!response.ok) {
            console.error("잠시 후 다시 이용해주세요");
            alert("잠시 후 다시 이용해주세요");
            return null;
        }
        return await response.json();
    }

    return (
        <div>
            {initLoading && <Skeleton count={skeletonCnt} init={true}/>}
            {!initLoading &&
                <>
                    <SearchList stores={storeList} setStores={setStoreList}/>
                    {loading && (window.innerWidth <= 400 ? <Skeleton count={1}/> : <Skeleton count={skeletonCnt}/>)}
                    <div ref={skeletonRef}></div>
                </>
            }
        </div>
    );
};

export default Search;