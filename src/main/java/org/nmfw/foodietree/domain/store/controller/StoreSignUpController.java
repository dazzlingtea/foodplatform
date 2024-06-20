package org.nmfw.foodietree.domain.store.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.nmfw.foodietree.domain.store.dto.request.StoreSignUpDto;
import org.nmfw.foodietree.domain.store.service.StoreSignUpService;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/store")
public class StoreSignUpController {
    private final StoreSignUpService storeSignUpService;

    /**
     *
     * @param dto
     * @return StoreSignUpService에서 성공적으로 회원가입완료시 다음페이지로 이동
     */
    @PostMapping("/sign-up")
    public String StoreSignUp(@Validated @RequestBody StoreSignUpDto dto) {
        log.info("/store-sign-up POST");
        log.info("parameter:{}", dto);

        boolean flag = storeSignUpService.storeSignUp(dto);
        if (flag) {
            log.debug("회원가입 성공");
        } else {
            log.debug("회원가입 실패");
        }
        return "store-signup-test";
    }

    @GetMapping("/sign-up")
    public String StoreSignUpForm() {
        return "store-signup-test";
    }
}
