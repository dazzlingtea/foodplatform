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

    @PostMapping("/p")
    public ResponseEntity<?> approveProduct(
            @Validated @RequestPart("price") int price
          , @Validated @RequestPart("productCnt") int productCnt
          , @Validated @RequestPart("productImage")MultipartFile file
//        , @AuthenticationPrincipal TokenUserInfo userInfo
            , BindingResult bindingResult
    ) {
        if(bindingResult.hasErrors()) {
            Map<String, String> errors = makeValidationMessageMap(bindingResult);
            return ResponseEntity.badRequest().body(errors);
        }

        ProductApprovalReqDto dto = ProductApprovalReqDto.builder()
                .price(price)
                .productCnt(productCnt)
                .productImage(file)
                .build();

        // tbl_product_approval 저장
        boolean flag = productApprovalService
                .askProductApproval(
                        dto
//                        , userInfo
                );

        if (!flag) { // DB 저장 실패
            return ResponseEntity.internalServerError().body("");
        }
        // DB 저장 성공
        return ResponseEntity.ok().body("");
    }

    // BindingResult 에러와 에러 메세지를 Map에 담기
    private Map<String, String> makeValidationMessageMap(BindingResult bindingResult) {
        Map<String, String> errors = new HashMap<>();
        List<FieldError> fieldErrors = bindingResult.getFieldErrors();
        for (FieldError error: fieldErrors) {
            errors.put(error.getField(), error.getDefaultMessage());
        }
        return errors;
    }
}
