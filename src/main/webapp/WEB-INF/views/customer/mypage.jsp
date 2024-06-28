<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FoodieTree</title>
    <link rel="stylesheet" href="/assets/css/common.css">
    <link rel="stylesheet" href="/assets/css/customer/customer-mypage.css">

</head>
<body>
<header>
    <div class="container">
        <div class="logo"><h1>FoodieTree</h1></div>
        <div class="logo-img">
            <img src="/assets/img/img_2.png" alt="">
        </div>
    </div>
</header>
<section class="my-page-area">
    <div class="container">
        <div class="profile">
            <a href="#" id="avatar">
                <img src="${customerMyPageDto.profileImage ? customerMyPageDto.profileImage : '/assets/img/western.jpg'}"
                     alt="Customer profile image">
            </a>
            <h2>${customerMyPageDto.nickname}</h2>
            <p>${customerMyPageDto.customerId}</p>
            <ul class="nav">
                <li class="nav-item"><a class="nav-link" href="mypage">마이페이지</a></li>
                <li class="nav-item"><a class="nav-link" href="mypage-edit">개인정보수정</a></li>
            </ul>
        </div>
        <div class="info">
            <h3>예약 내역</h3>
            <div class="reservation-list">
                <c:forEach var="reservation" items="${reservations}">
                    <div class="reservation-item">
                        <img src="${reservation.storeImg}" alt="Store Image"/>
                        <span>${reservation.storeName}</span>
                        <span>${reservation.status}</span>
                        <span>${reservation.pickUpTime}</span>
                    </div>
                </c:forEach>
            </div>
            <h4>선호 지역</h4>
            <ul>
                <c:forEach var="area" items="${customerMyPageDto.preferredArea}">
                    <li>${area}</li>
                </c:forEach>
            </ul>
            <h4>선호 음식</h4>
            <ul>
                <c:forEach var="food" items="${customerMyPageDto.preferredFood}">
                    <li>
                        <div class="img-wrapper">
                            <img src="${food.foodImage}" alt="선호음식이미지" />
                        </div>
                        <span>${food.preferredFood}</span>
                    </li>
                </c:forEach>
            </ul>
            <h4>최애 가게</h4>
            <ul>
                <c:forEach var="area" items="${customerMyPageDto.favStore}">
                    <li>
                        <div class="img-wrapper">
                            <img src="${area.storeImg}" alt="최애가게이미지">
                        </div>
                        <span>${area.storeName}</span>
                    </li>
                </c:forEach>
            </ul>
            <h3>이슈 내역</h3>
            <div class="issue-list">
                <c:forEach var="issue" items="${issues}">
                    <div class="issue-item">
                        <span>${issue.issueCategory.issueName}</span>
                        <span>${issue.issueText}</span>
                        <span>${issue.issueStatus}</span>
                        <span>${issue.cancelIssueAt}</span>
                        <span>${issue.storeName}</span>
                        <span>${issue.nickname}</span>
                    </div>
                </c:forEach>
            </div>
            <div class="stats">
                <div>10kg의 음쓰를 줄였습니다</div>
                <div>지금까지 10만원을 아꼈어요</div>
            </div>
        </div>
    </div>
</section>


</body>
</html>
