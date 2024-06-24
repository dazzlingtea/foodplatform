package org.nmfw.foodietree.domain.customer.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.nmfw.foodietree.domain.customer.entity.Customer;

@Mapper
public interface CustomerMapper {

    // 회원 가입
    boolean save(Customer customer);

    // 회원 정보 개별 조회
    Customer findOne(String id);

    /**
     * @param type - 어떤걸 중복검사할지 (ex: account Or emaul)
     * @param keyword - 중복검사할 실제값
     * @return - 중복이면 true, 아니면 false
     */
    // 중복 확인
    boolean existsById(@Param("customerId") String customerId);
}
