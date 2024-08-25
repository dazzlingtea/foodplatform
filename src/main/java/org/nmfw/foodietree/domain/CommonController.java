package org.nmfw.foodietree.domain;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.nmfw.foodietree.domain.customer.dto.resp.CustomerIssueDetailDto;
import org.nmfw.foodietree.domain.customer.dto.resp.CustomerMyPageDto;
import org.nmfw.foodietree.domain.customer.mapper.CustomerMapper;
import org.nmfw.foodietree.domain.customer.service.CustomerMyPageService;
import org.nmfw.foodietree.domain.customer.util.LoginUtil;
import org.nmfw.foodietree.domain.store.dto.resp.StoreListByEndTimeDto;
import org.nmfw.foodietree.domain.store.dto.resp.StoreListCo2Dto;
import org.nmfw.foodietree.domain.store.mapper.StoreMapper;
import org.nmfw.foodietree.domain.store.service.StoreList.StoreListService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@Slf4j
@RequiredArgsConstructor
public class CommonController {

//    private final CustomerMapper customerMapper;
//    private final StoreMapper storeMapper;
//
//    @GetMapping
//    public String root(HttpSession session) {
//        String loggedInUser = LoginUtil.getLoggedInUser(session);
//        if (loggedInUser != null && customerMapper.findOne(loggedInUser) != null) {
//            return "redirect:/product/main";
//        }
//        if (loggedInUser != null && storeMapper.findOne(loggedInUser) != null) {
//            return "redirect:/store/mypage/main";
//        }
//        return "index";
//    }

    private final StoreListService storeListService;

    // guest 화면 가게 정보 렌더링
    @GetMapping
    public String getStoreListsForGuests(Model model) {
        List<StoreListCo2Dto> storesByProductCount = storeListService.getStoresByProductCnt();
        List<StoreListByEndTimeDto> storesByEndTime = storeListService.getStoresByProductEndTime();
        // co2를 가장 많이 줄인 순
        model.addAttribute("storesByProductCount", storesByProductCount);
        log.info("상품을 가장 많이 판 순 : {}", storesByProductCount);
        // 상품 시간이 현재로부터 제일 가까운 순 (마감임박)
        model.addAttribute("storesByEndTime", storesByEndTime);
        log.info("상품 마감 임박 순 : {}", storesByEndTime);

        return "index"; // JSP 파일명
    }
}
