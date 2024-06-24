package org.nmfw.foodietree.domain.customer.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.nmfw.foodietree.domain.customer.dto.request.CustomerLoginDto;
import org.nmfw.foodietree.domain.customer.service.CustomerService;
import org.nmfw.foodietree.domain.customer.service.LoginResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/customer")
@Slf4j
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    //로그인 양식 열기(조회)
    @GetMapping("/sign-in")
    public void signIn() {
        System.out.println("sign-in open test");
        log.info("customer/sign-in GET : forwarding to sign-in.jsp");
    }


    //로그인 요청 처리
    @PostMapping("/sign-in")
    public String signIn(CustomerLoginDto dto,
                         RedirectAttributes ra, //리다이렉트 후에도 메시지 유지
                         HttpServletRequest request) { //HTTP 요청 정보 담고 있는 객체(세션)
        log.info("/customer/sign-in POST");

        // dto가 null일 경우에 대한 예외 처리
        if (dto == null) {
            log.warn("CustomerLoginDto is null");
            ra.addFlashAttribute("error", "Invalid login details");
            return "redirect:/customer/sign-in";
        }

        log.debug("parameter: {}", dto);

        HttpSession session = request.getSession();

        LoginResult result = customerService.authenticate(dto, session);

        ra.addFlashAttribute("result", result);

        //로그인 성공 시 가게 주소 입력하는 소비자 메인창으로 이동
        if(result == LoginResult.SUCCESS) {
            return "redirect:/";
        }
        //로그인 실패시 다시 로그인 페이지 랜더링
        return "redirect:/customer/sign-in";
    }
}

