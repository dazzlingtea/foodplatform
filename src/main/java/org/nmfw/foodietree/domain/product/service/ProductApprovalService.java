package org.nmfw.foodietree.domain.product.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.nmfw.foodietree.domain.product.Util.FileUtil;
import org.nmfw.foodietree.domain.product.dto.request.ProductApprovalReqDto;
import org.nmfw.foodietree.domain.product.entity.ProductApproval;
import org.nmfw.foodietree.domain.product.repository.ProductApprovalRepository;
import org.nmfw.foodietree.domain.store.entity.Store;
import org.nmfw.foodietree.domain.store.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ProductApprovalService {

    @Value("${file.upload.root-path}")
    private String rootPath;

//    private final ProductApprovalMapper productApprovalMapper;
    private final ProductApprovalRepository productApprovalRepository;
    private final StoreRepository storeRepository;

    // 요청대로 tbl_product_approval save
    public void askProductApproval(
            ProductApprovalReqDto dto
//            , TokenUserInfo userInfo
    ) {
        // userInfo에서 storeId로 Store 찾기
        // controller에서 try catch 필요
//        Store LoggedStore = storeRepository
//          .findById(userInfo.getUserId())
//          .orElseThrow(() -> new NotFoundException(""))

        // 이미지 파일 저장 및 경로 문자열로 반환
        MultipartFile file = dto.getProductImage();
        String productImage = null;
        if (!file.isEmpty()) {
            productImage = FileUtil.uploadFile(rootPath, file);
        }
        //
        ProductApproval entity = ProductApproval.builder()
                .price(dto.getPrice())
                .proImage(productImage)
                .productCnt(dto.getProductCnt())
//                .store(loggedStore)
                .build();

        // repository DB 저장
        ProductApproval saved = productApprovalRepository.save(entity);
        log.info("saved prodcutApproval: {}", saved);
    }

    // 요청 진행상황에 따라 status 처리

    // 요청 승인되면 각 테이블에 저장 (tbl_store, tbl_product)
    public void sendProductInfo(
            ProductApproval productApproval
    ) {
        // product 테이블에 image 저장


        // store 테이블로 가격, 수량 저장 (Exception 처리)
        Store store = productApproval.getStore();
        Store saved = storeRepository.save(store);

        // store 저장 성공하면
        // tbl_product 테이블로 proImage, store 저장

    }

}
