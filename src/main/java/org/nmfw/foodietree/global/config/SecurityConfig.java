package org.nmfw.foodietree.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity //시큐리티 설정 파일(애노테이션)
public class SecurityConfig {

    //시큐리티 기본 설정(인증 인가 처리, 초기 로그인화면 없애기) 여기서 할 수 있음.
    // 내가 안만든 객체, 클래스를 주입할 때 @Bean 사용
    @Bean //@Component(@Contoller, @Service, @Repository, @Mapper)
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
//                //모든 요청에 대해 인증하지 않겠다.
//                .authorizeRequests()
//                .anyRequest().authenticated()
//                .antMatchers("/**").permitAll();
//                .and
//                .csrf().disable()// csrf 토큰공격방지 기능 off
                .authorizeRequests()
                .antMatchers("/store/approval/**").permitAll() // 해당 URL에 대한 접근 허용
                .anyRequest().authenticated()
                .and()
                .csrf().disable(); // CSRF 보호 비활성화 (테스트용)

        return  http.build();
    }

    //한가지 더 주입받고 싶은 객체 :
    //비밀번호를 인코딩하는 객체를 스프링 컨테이너에 등록
    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder(); // 이 녀석을 주입받아 사용할 수 있다
    }

}