package org.nmfw.foodietree.domain.product.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.nmfw.foodietree.domain.product.dto.request.ProductApprovalReqDto;
import org.nmfw.foodietree.domain.product.service.ProductApprovalService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/store/approval")
@Slf4j
@RequiredArgsConstructor
public class ProductApprovalController {

    private final ProductApprovalService productApprovalService;

    // 상품 등록 요청
    @PostMapping("/p")
    public ResponseEntity<?> approveProduct(
            @Validated @RequestPart("price") int price
          , @Validated @RequestPart("productCnt") int productCnt
          , @Validated @RequestPart("productImage")MultipartFile file
//        , @AuthenticationPrincipal TokenUserInfo userInfo
    ) {
        // Validation 예외처리는 ExceptionAdvisor.java
        // userInfo는 service에서 처리

        ProductApprovalReqDto dto = ProductApprovalReqDto.builder()
                .price(price)
                .productCnt(productCnt)
                .productImage(file)
                .build();

        // 상품 등록 요청 처리 (tbl_product_approval)
        try {
            productApprovalService.askProductApproval(
                    dto
//                    , userInfo
            );
        } catch (Exception e) { // 등록 요청 실패
//            throw new RuntimeException(e);
            return ResponseEntity.internalServerError().body(e.getMessage());
        }

        // 등록 요청 성공
        return ResponseEntity.ok().body("");
    }

}
