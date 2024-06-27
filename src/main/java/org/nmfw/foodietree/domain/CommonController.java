package org.nmfw.foodietree.domain;

import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@Slf4j
public class CommonController {
    @Value("${env.kakao.api.key:default}")
    private String kakaoApiKey;

    @GetMapping("/sign-in")
    public String login() {
        return "sign-in";
    }

    @Data
    static class SignUpDto {
        private String account;
        private String password;
        private String name;
        private String email;
        private String profileImage;
        private List<String> food;
        private List<String> location;
    }
}
