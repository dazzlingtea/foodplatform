package org.nmfw.foodietree.domain.store.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.nmfw.foodietree.domain.store.service.LoginIdCheckService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/SignUp")
@Slf4j
@RequiredArgsConstructor
public class LoginIdCheckController {

    private final LoginIdCheckService loginIdCheckService;

    // 아이디(이메일) 중복검사 비동기 요청 처리
    @GetMapping("/check")
    @ResponseBody
    public ResponseEntity<?> check(String type, String keyword) {
        log.info("{} {}", type, keyword);

        boolean flag = loginIdCheckService.checkIdentifier(type, keyword);
        return ResponseEntity
                .ok()
                .body(flag);
    }

    @GetMapping("/check-form")
    public String check2() {
        System.out.println("LoginIdCheckController.check");
        return "LoginIdCheck";
    }


}
