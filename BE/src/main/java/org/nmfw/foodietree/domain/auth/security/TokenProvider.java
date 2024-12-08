package org.nmfw.foodietree.domain.auth.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.nmfw.foodietree.domain.auth.dto.EmailCodeDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Collection;
import java.util.Date;
import java.util.List;


@Component
@Slf4j
public class TokenProvider {

    @Value("${jwt.secret}")
    private String SECRET_KEY;

    @Value("${env.jwt.refresh}")
    private String REFRESH_SECRET_KEY;

    // create access token : short term for access server DB and saved at local storage
    public String createToken(String email, String userType) {

        byte[] decodedKey = Base64.getDecoder().decode(SECRET_KEY);
        System.out.println("Decoded Key Length in Bytes: " + decodedKey.length);
        System.out.println("Decoded Key Length in Bits: " + (decodedKey.length * 8));

        byte[] keyBytes = SECRET_KEY.getBytes();
        Key key = Keys.hmacShaKeyFor(keyBytes);
        System.out.println("Secret Key Length in Bytes: " + key.getEncoded().length);
        System.out.println("Secret Key Length in Bits: " + (key.getEncoded().length * 8));



        String compact = Jwts.builder()
                .claim("role", userType) // role 클레임에 userType 추가
                // header에 들어갈 내용 및 서명을 하기 위한 SECRET_KEY
                .signWith(key, SignatureAlgorithm.HS512)
                // payload에 들어갈 내용
                .setSubject(email) // sub
                .setIssuer("foodie tree") // iss
                .setIssuedAt(new Date()) // iat
                .setExpiration(Date.from(Instant.now().plus(1, ChronoUnit.MINUTES))) // exp
                .compact();

        log.info(" access token 발급 완료 ✅");

        return compact;

    }


    public String createRefreshToken(String email, String userType) {

        byte[] keyBytes = REFRESH_SECRET_KEY.getBytes();
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return Jwts.builder()
                .claim("role", userType) // role 클레임에 userType 추가
                .signWith(key, SignatureAlgorithm.HS512)
                .setSubject(email)
                .setIssuer("foodie tree token refresher")
                .setIssuedAt(new Date())
                .setExpiration(Date.from(Instant.now().plus(30, ChronoUnit.DAYS))) // 유효기간 30일로 설정
                .compact();
    }


    public LocalDateTime getExpirationDateFromRefreshToken(String refreshToken) {

        byte[] keyBytes = REFRESH_SECRET_KEY.getBytes();
        Key key = Keys.hmacShaKeyFor(keyBytes);

        Date expiration = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(refreshToken)
                .getBody()
                .getExpiration();

        return expiration.toInstant()
                .atZone(ZoneId.systemDefault()) // 시스템 기본 시간대를 사용
                .toLocalDateTime();
    }


    public TokenUserInfo validateAndGetTokenInfo(String token) {

        log.info("validateAndGetTokenInfo run!!!!");

        try {
            //토큰 발급 당시 서명 처리
            Claims claims = Jwts.parserBuilder()
                    // 토큰 발급자의 발급 당시 서명을 넣음
                    .setSigningKey(
                            Keys.hmacShaKeyFor(SECRET_KEY.getBytes())
                    )
                    // 서명위조 검사 진행 : 위조된 경우 Exception이 발생
                    // 위조되지 않은 경우 클레임을 리턴
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            log.info(" ACCESS validateAndGetTokenInfo Claims: {}", claims);

            Date exp = claims.getExpiration();
            LocalDateTime tokenExpireDate = exp.toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDateTime();

            TokenUserInfo build = TokenUserInfo.builder()
                    .email(claims.get("sub", String.class))
                    .role(claims.get("role", String.class))
                    .tokenExpireDate(tokenExpireDate)
                    .build();

            log.info("검증 통과 후 엑세스 토큰 유저 인포 정보 {},{}", build.email, build.role);

            return build;

        } catch (JwtException e) {
            log.error("ACCESS Token validation error: {}", e.getMessage());
            throw e;
        }
    }

    public TokenUserInfo validateAndGetRefreshTokenInfo(String refreshToken) {

        log.info("validateAndGetRefreshTokenInfo run!!!!");

        if (refreshToken == null || refreshToken.isEmpty()) {
            throw new IllegalArgumentException("JWT String argument cannot be null or empty.");
        }

        try {
            //토큰 발급 당시 서명 처리
            Claims claims = Jwts.parserBuilder()
                    // 토큰 발급자의 발급 당시 서명을 넣음
                    .setSigningKey(
                            Keys.hmacShaKeyFor(REFRESH_SECRET_KEY.getBytes())
                    )
                    // 서명위조 검사 진행 : 위조된 경우 Exception이 발생
                    // 위조되지 않은 경우 클레임을 리턴
                    .build()
                    .parseClaimsJws(refreshToken)
                    .getBody();


            log.info("REFRESH validateAndGetTokenInfo Claims: {}", claims);

            Date exp = claims.getExpiration();
            LocalDateTime tokenExpireDate = exp.toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDateTime();

            TokenUserInfo build = TokenUserInfo.builder()
                    .email(claims.get("sub", String.class))
                    .role(claims.get("role", String.class))
                    .tokenExpireDate(tokenExpireDate)
                    .build();

            log.info("검증 통과 후 리프레시토큰 유저 인포 정보 {},{}", build.email, build.role);

            return build;

        } catch (JwtException e) {
            log.error("REFRESH Token validation error: {}", e.getMessage());
            throw e; // 또는 적절한 예외 처리
        }
    }

    @Getter
    @ToString
    @EqualsAndHashCode
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TokenUserInfo implements UserDetails {
        private String role;
        private String email;
        private LocalDateTime tokenExpireDate; // 토큰의 만료일자를 담음

        // usertype(role)
        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return List.of(new SimpleGrantedAuthority(role));
        }

        @Override
        public String getPassword() {
            return null; // JWT 기반 인증에서는 비밀번호가 필요 없음
        }

        // email
        @Override
        public String getUsername() {
            return email;
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }

}
