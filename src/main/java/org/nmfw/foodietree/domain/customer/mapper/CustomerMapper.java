package org.nmfw.foodietree.domain.customer.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.nmfw.foodietree.domain.customer.entity.Customer;

@Mapper
public interface CustomerMapper {

    // 회원 가입
    boolean save(Customer customer);

    // 회원 정보 개별 조회
    // 아이디 중복확인이 아니라 계정여부를 비교하는 객체가 필요하지 않을까?
    Customer findOne(String customer);

    /**
     * @param customerId - 이메일
     * @return - 중복이면 true, 아니면 false
     */
    // 중복 확인
    boolean existsById(@Param("customerId") String customerId);
}
