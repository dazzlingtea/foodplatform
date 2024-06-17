package org.nmfw.foodietree.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity // 시큐리티 설정 파일
public class SecurityConfig {

    // 시큐리티 기본 설정 (인증 인가 처리, 초기 로그인화면 없애기)
    @Bean // @Component (@Controller, @Service, @Repository, @Mapper) => 우리가 만든 클래스에 붙이는거고
    // @Bean은 내가 안만든 클래스에 붙임. 스프링에게 주입해달라고 쓰는 것
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // csrf 토큰 공격방지 기능 off
                // 저 패턴에 해당 되는 요청은 모두 허용한다 (인증 안하겠다)
                // 즉 여기선 모든 요청에 대해 인증하지 않겠다
                .authorizeRequests().antMatchers("/**").permitAll();
        return http.build();
    }

    // 비밀번호를 인코딩하는 객체를 스프링 컨테이너에 등록
    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }
}