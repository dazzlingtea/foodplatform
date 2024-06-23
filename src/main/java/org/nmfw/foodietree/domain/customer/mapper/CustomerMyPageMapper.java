package org.nmfw.foodietree.domain.customer.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.nmfw.foodietree.domain.customer.dto.resp.CustomerMyPageDto;
import org.nmfw.foodietree.domain.customer.entity.ReservationDetail;

import java.util.List;

@Mapper
public interface CustomerMyPageMapper {

    // 회원 정보 개별조회
    CustomerMyPageDto findOne(String customerId);

    // 회원 선호 지역 조회
    List<String> findPreferenceAreas(@Param("customerId") String customerId);

    // 회원 선호 음식 조회
    List<String> findPreferenceFoods(@Param("customerId") String customerId);

    // 회원 예약 내역 조회
    // ReservationDetail로 반환받음
    // Service에서 화면에 전송할 MyPageReservationDetailDto로 변환 후 jsp로 전송
    List<ReservationDetail> findReservations(@Param("customerId") String customerId);

    /**
     * 회원정보 업데이트
     * @param customerId : 업데이트할 회원 아이디
     * @param type : 업데이트할 필드
     *             (customer_password, nickname, customer_phone_number, profile_image)
     * @param value : 해당 필드에 새로 지정할 값
     */
    void updateCustomerInfo(
            @Param("customerId") String customerId,
            @Param("type") String type,
            @Param("value") String value
    );

    /**
     *
     * @param customerId : 업데이트할 회원 아이디
     * @param preferredValue : preferredFood는 enum인 PreferredFoodCategory
     */
    void updateCustomerPreference(
            @Param("customerId") String customerId,
            @Param("preferredValue") String preferredValue
            );

    // 예약 업데이트
    void updateReservation(String customerId);

    // 픽업 확인
    void confirmPickUp(String customerId);
}
