package org.nmfw.foodietree.domain.store.mapper;


import org.apache.ibatis.annotations.Mapper;

import org.nmfw.foodietree.domain.store.entity.Store;


@Mapper
public interface StoreApprovalMapper {

    // 입력한 아이디 조회
    Store selectStoreById(String storeId);

    // 해당 아이디에 정보 업데이트
    boolean updateStoreInfo(Store store);

}