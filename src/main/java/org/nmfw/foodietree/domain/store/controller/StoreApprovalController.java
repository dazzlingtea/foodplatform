package org.nmfw.foodietree.domain.store.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.nmfw.foodietree.domain.product.controller.ProductApprovalController;
import org.nmfw.foodietree.domain.store.dto.request.StoreApprovalReqDto;
import org.nmfw.foodietree.domain.store.service.StoreApprovalService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/store/approval")
@Slf4j
@RequiredArgsConstructor
public class StoreApprovalController {

    private final StoreApprovalService storeApprovalService;

    // 가게 등록 요청
    @PostMapping("/")
    public ResponseEntity<?> approveStore(
            @Valid @RequestBody StoreApprovalReqDto dto
//        , @AuthenticationPrincipal TokenUserInfo userInfo
    ) {
        // Validation 예외처리는 ExceptionAdvisor.java
        // userInfo는 service에서 처리

        // 가게 등록 요청 처리 (tbl_store_approval)
        try {
            storeApprovalService.askStoreApproval(
                    dto
    //                , userInfo
            );
        } catch (Exception e) { // 등록 요청 실패
//            throw new RuntimeException(e);
            return ResponseEntity.internalServerError().body(e.getMessage());
        }

        // 등록 요청 성공
        return ResponseEntity.ok().body("");
    }
}
