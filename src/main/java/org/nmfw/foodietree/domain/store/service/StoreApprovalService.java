package org.nmfw.foodietree.domain.store.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.nmfw.foodietree.domain.store.dto.request.StoreApprovalReqDto;
import org.nmfw.foodietree.domain.store.entity.Store;
import org.nmfw.foodietree.domain.store.entity.StoreApproval;
import org.nmfw.foodietree.domain.store.repository.StoreApprovalRepository;
import org.nmfw.foodietree.domain.store.repository.StoreRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class StoreApprovalService {

//    private final StoreApprovalMapper storeApprovalMapper;
    private final StoreApprovalRepository storeApprovalRepository;
    private final StoreRepository storeRepository;

    // 등록 요청 내역을 tbl_store_approval에 저장
    public void askStoreApproval(
            StoreApprovalReqDto dto
//            TokenUserInfo userInfo
    ) {
        // userInfo storeId로 Store
//        Store foundStore = storeRepository
//                .findById(userInfo.getUserId()).orElseThrow();

        StoreApproval storeApproval = dto.toEntity();
//        storeApproval.setStore(foundStore);
        StoreApproval saved = storeApprovalRepository.save(storeApproval);
        log.info("saved storeApproval: {}", saved);
    }

    // 가게 등록 요청이 승인되면 tbl_store에 저장
    public void sendStoreInfo(
            StoreApproval sa
    ) {
        Store store = sa.getStore();
        Store updatedStore = sa.updatedByStoreApporval();
        Store saved = storeRepository.save(updatedStore);
        log.info("saved store: {}", saved);

    }
}
