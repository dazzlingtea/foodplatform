package org.nmfw.foodietree.domain.customer.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.nmfw.foodietree.domain.customer.dto.resp.CustomerFavStoreDto;
import org.nmfw.foodietree.domain.customer.dto.resp.CustomerIssueDetailDto;
import org.nmfw.foodietree.domain.customer.dto.resp.CustomerMyPageDto;
import org.nmfw.foodietree.domain.customer.dto.resp.MyPageReservationDetailDto;
import org.nmfw.foodietree.domain.customer.entity.CustomerIssues;
import org.nmfw.foodietree.domain.customer.entity.ReservationDetail;
import org.nmfw.foodietree.domain.customer.entity.value.IssueCategory;
import org.nmfw.foodietree.domain.customer.entity.value.IssueStatus;
import org.nmfw.foodietree.domain.customer.entity.value.PickUpStatus;
import org.nmfw.foodietree.domain.customer.entity.value.PreferredFoodCategory;
import org.nmfw.foodietree.domain.customer.mapper.CustomerMyPageMapper;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static org.nmfw.foodietree.domain.customer.entity.value.IssueCategory.fromString;
import static org.nmfw.foodietree.domain.customer.entity.value.IssueStatus.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomerMyPageService {
    private final CustomerMyPageMapper customerMyPageMapper;

    // customer 마이페이지 소비자 정보 조회 중간 처리
    public CustomerMyPageDto getCustomerInfo(String customerId, HttpServletRequest request, HttpServletResponse response) {

        CustomerMyPageDto customer = customerMyPageMapper.findOne(customerId);
        List<String> preferenceAreas = customerMyPageMapper.findPreferenceAreas(customerId);
        List<String> preferenceFoods = customerMyPageMapper.findPreferenceFoods(customerId);
        List<CustomerFavStoreDto> favStore = customerMyPageMapper.findFavStore(customerId);

        // preferenceFoods String 반환 된 값들 enum(PreferredFoodCategory)으로 변경
        List<PreferredFoodCategory> preferredFoodCategories = preferenceFoods.stream()
                .map(PreferredFoodCategory::fromKoreanName)
                .collect(Collectors.toList());

        return CustomerMyPageDto.builder()
                .customerId(customer.getCustomerId())
                .nickname(customer.getNickname())
                .profileImage(customer.getProfileImage())
                .customerPhoneNumber(customer.getCustomerPhoneNumber())
                .preferredFood(preferredFoodCategories)
                .preferredArea(preferenceAreas)
                .favStore(favStore)
                .build();
    }

    /**
     *
     * @param customerId: 회원아이디를 전달받아
     * @return MyPageReservationDetailDto List
     */
    public List<MyPageReservationDetailDto> getReservationInfo(String customerId) {

        List<ReservationDetail> reservations = customerMyPageMapper.findReservations(customerId);

        return reservations.stream().map(reservation -> MyPageReservationDetailDto.builder()
                .customerId(reservation.getCustomerId())
                .nickname(reservation.getNickname())
                .reservationTime(reservation.getReservationTime())
                .cancelReservationAt(reservation.getCancelReservationAt())
                .pickedUpAt(reservation.getPickedUpAt())
                .status(determinePickUpStatus(reservation))
                .pickUpTime(reservation.getPickupTime())
                .storeName(reservation.getStoreName())
                .storeImg(reservation.getStoreImg())
                .build()
        ).collect(Collectors.toList());
    }

    private PickUpStatus determinePickUpStatus(ReservationDetail reservation) {
        if (reservation.getCancelReservationAt() != null) {
            return PickUpStatus.CANCELED;
        }else if(reservation.getPickedUpAt() != null) {
            return PickUpStatus.PICKEDUP;
        }else{
            return PickUpStatus.RESERVED;
        }
    }


    public List<CustomerIssueDetailDto> getCustomerIssues(String customerId) {
        List<CustomerIssues> issues = customerMyPageMapper.findIssues(customerId);

        return issues.stream().map(issue -> CustomerIssueDetailDto.builder()
                .customerId(issue.getCustomerId())
                .nickname(issue.getNickname())
                .storeName(issue.getStoreName())
                .issueCategory(fromString(issue.getIssueCategory()))
                .issueStatus(checkIssueStatus(issue.getIssueCompleteAt()))
                .issueCompleteAt(issue.getIssueCompleteAt())
                .issueText(issue.getIssueText())
                .cancelIssueAt(issue.getCancelIssueAt())
                .build()
        ).collect(Collectors.toList());
    }

    /**
     * 이슈가 해결되어 시간이 있다면 -> Solved(해결완료)
     * 접수된 시간이 있다면 -> INPROGRESS(진행중)
     * @param issueCompleteAt : 이슈가 해결된 시간
     * @return Status enum
     */
    private IssueStatus checkIssueStatus(LocalDateTime issueCompleteAt) {
        if (issueCompleteAt == null) {
            return INPROGRESS;
        }else{
            return SOLVED;
        }
    }
}
