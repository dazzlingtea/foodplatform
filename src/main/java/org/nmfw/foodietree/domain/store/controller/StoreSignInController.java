package org.nmfw.foodietree.domain.store.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.nmfw.foodietree.domain.store.dto.request.StoreLoginDto;
import org.nmfw.foodietree.domain.store.service.StoreLoginResult;
import org.nmfw.foodietree.domain.store.service.StoreService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/store")
@Slf4j
@RequiredArgsConstructor
public class StoreSignInController {

    private final StoreService storeService;

    //로그인 양식 열기
    @GetMapping("/sign-in")
    public String login(HttpSession session
            , @RequestParam(required = false) String redirect) {

        session.setAttribute("redirect", redirect);
        return "login";
    }

    @PostMapping("/sign-in")
    public String login(@RequestBody StoreLoginDto dto,
                        RedirectAttributes ra,
                        HttpServletRequest request,
                        HttpServletResponse response) {
        HttpSession session = request.getSession();

        StoreLoginResult result = storeService.authenticate(dto, session, response);

        ra.addFlashAttribute("result", result);

        if (result == StoreLoginResult.SUCCESS) {

            // 혹시 세션에 리다이렉트 URL이 있다면
            String redirect = (String) session.getAttribute("redirect");
            if (redirect != null) {
                session.removeAttribute("redirect");
                return "redirect:" + redirect;
            }
            return "redirect:/"; // 로그인 성공시
        }
        System.out.println("sdsds");
        return "redirect:/store/sign-in";
    }
}
