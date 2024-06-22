package org.nmfw.foodietree.domain;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CommonController {
    @GetMapping("/sign-in")
    public String login() {
        return "sign-in";
    }
}
