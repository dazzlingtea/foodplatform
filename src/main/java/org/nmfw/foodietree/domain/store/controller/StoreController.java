package org.nmfw.foodietree.domain.store.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import javax.servlet.http.HttpSession;

@Controller
public class StoreController {
    @GetMapping("/sign-out")
    public String signOut(HttpSession session){

        //세션구하기
        //HttpSession session = request.getSession();

        // 세션에서 로그인 기록 삭제
        session.removeAttribute("login");

        // 세션을 초기화 (reset)
        session.invalidate();

        // 홈으로 보내기
        return "redirect:/";
    }
}
