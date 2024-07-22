package org.nmfw.foodietree.domain.store.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.nmfw.foodietree.domain.store.dto.request.StoreApprovalReqDto;
import org.nmfw.foodietree.domain.store.dto.resp.StoreApprovalDto;
import org.nmfw.foodietree.domain.store.entity.value.StoreCategory;
import org.nmfw.foodietree.domain.store.service.StoreApprovalService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/store")
@Slf4j
@RequiredArgsConstructor
public class StoreApprovalController {

    private final StoreApprovalService storeApprovalService;

    @GetMapping("/approval")
    public String storeApprovalForm() {
        return "store/approval-form";
    }

    @PostMapping("/approval")
    public String storeApprovalResult(
            @RequestBody StoreApprovalReqDto dto
//        @AuthenticationPrincipal TokenUserInfo userInfo
    ) {
        // userInfo


        // DTO를 사용하여 데이터 전달
        storeApprovalService.registerStoreInfo(dto);

        // 결과 페이지로 이동

        return "redirect:/store/product";
    }
}
