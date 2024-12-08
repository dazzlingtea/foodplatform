package org.nmfw.foodietree.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// 전역 크로스오리진 설정: 어떤 클라이언트를 허용할 것인지
@Configuration
public class CrossOriginConfig implements WebMvcConfigurer {

    private String[] urls = {
            "http://localhost:3000",
            "http://localhost:3001",
            "http://localhost:3002",
            "http://localhost:3003",
	        "http://3.38.5.29:3000",
            "https://foodietreee.shop:3000",
            "http://172.30.1.24:3001",
            "https://foodietreee.shop:8083",
            "https://foodietreee.shop",
    };

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 어떤 url 요청에서
                .allowedOrigins(urls) // 어떤 클라이언트를
                .allowedMethods("*") // 어떤 방식에서 "GET", "POST" ...
                .allowedHeaders("*") // 어떤 헤더를 허용할지 ex. Content-Type..
                .allowCredentials(true) // 쿠키 전송을 허용할 지
        ;
        // registry.addMapping ... 전역설정 추가 가능
    }
}
