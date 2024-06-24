package org.nmfw.foodietree.domain.customer.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.nmfw.foodietree.domain.customer.dto.request.CustomerLoginDto;
import org.nmfw.foodietree.domain.customer.dto.request.SignUpDto;
import org.nmfw.foodietree.domain.customer.entity.Customer;
import org.nmfw.foodietree.domain.customer.repository.CustomerMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import javax.servlet.http.HttpSession;
import static org.nmfw.foodietree.domain.customer.service.LoginResult.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomerService {

    private final CustomerMapper customerMapper;
    private final PasswordEncoder encoder;

    public boolean join(SignUpDto dto) {
        // dto를 엔터티로 변환
        Customer customer = dto.toEntity();

        // 비밀번호 인코딩
        String encodedPassword = encoder.encode(dto.getCustomerPassword());
        customer.setCustomerPassword(encodedPassword);

        return customerMapper.save(customer);
    }

    //로그인 검증 처리
    public LoginResult authenticate(CustomerLoginDto dto, HttpSession session) {

        //회원가입 여부 확인
        String customerId = dto.getCustomerId();
        Customer foundCustomer =
                customerMapper.findOne(customerId);

        //customer가 null일 경우
        if (foundCustomer == null) {
            log.info("{} - 회원가입이 필요합니다.", customerId);
            return NO_ID;
        }

        //비밀번호 일치 검사
        String inputCustomerPassword = dto.getCustomerPassword();
        String originPassword = foundCustomer.getCustomerPassword();

        //실제 비밀번호와 암호화된 비밀번호 비교
        if (!encoder.matches(inputCustomerPassword, originPassword)) {
            log.info("비밀번호가 일치하지 않습니다.");
            return NO_PW;
        }

        log.info("{}님 로그인 성공", foundCustomer.getNickName());

        //세션 최대 비활성화 간격
        int maxInactiveInterval = session.getMaxInactiveInterval();

        //세션 수명 1시간 설정
        session.setMaxInactiveInterval(60 * 60);
        log.debug("session time: {}", maxInactiveInterval);

        session.setAttribute("loginUserName", foundCustomer.getNickName());

        return SUCCESS;
    }
}


