package org.nmfw.foodietree.domain.store.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.nmfw.foodietree.domain.store.dto.request.LoginDto;
import org.nmfw.foodietree.domain.store.dto.request.StoreLoginDto;
import org.nmfw.foodietree.domain.store.entity.Store;
import org.nmfw.foodietree.domain.store.mapper.StoreMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Service
@RequiredArgsConstructor
@Slf4j
public class StoreService {
    private final StoreMapper storeMapper;
    private final PasswordEncoder encoder;

    //회원가입중간 처리
    public boolean join(LoginDto dto) {
        Store store = dto.toEntity();

        //비번 인코딩
        String encodedPassword = encoder.encode(dto.getPassword());
        store.setPassword(encodedPassword);

        return storeMapper.save(store);
    }

    //로그인 검증 처리
    public StoreLoginResult authenticate(StoreLoginDto dto, HttpSession session, HttpServletResponse response) {

        //회원가입 여부 확인
        String storeId = dto.getStoreId();
        Store foundStore = storeMapper.findOne(storeId);

        if (foundStore == null) {
            log.info("{} - 회원가입이 필요합니다.",storeId);
            return StoreLoginResult.NO_ACC;
        }

        //비밀번호 일치 검사
        String inputPassword = dto.getPassword(); //입력한 회원의 아이디
        String originPassword = foundStore.getPassword(); //디비의 저장된 회원 아이디

        if (!encoder.matches(inputPassword, originPassword)) {
            log.info("비밀번호가 일치하지 않습니다");
            return StoreLoginResult.NO_PW;
        }
        return null;
    }

}
