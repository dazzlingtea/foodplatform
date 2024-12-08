<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <!-- FontAwesome CSS 추가 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

    <meta charset="UTF-8">
    <title>FoodieTree</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Francois+One&family=Margarine&family=Nanum+Gothic&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Jua&display=swap" rel="stylesheet">

    <!-- CSS : 헤더 스타일 -->
    <link rel="stylesheet" href="/assets/css/include/header.css">

</head>
<body>
<header class="header">

    <!-- 로고 -->
    <a href="/" class="logoBtn">
        <img src="${pageContext.request.contextPath}/assets/img/icon/greenlogo.png" alt="Green Foodie Tree Logo">
    </a>

    <!-- 현재 위치 -->
<%--    <div class="location-pin-icon">--%>
<%--        <img src="${pageContext.request.contextPath}/assets/img/icon/location-pin.png" alt="Location Pin Icon">--%>
<%--    </div>--%>
<%--    <div class="area-name">${address}</div>--%>
<%--    <div class="dot">・</div>--%>
<%--    <div class="selected-area-category">Now</div>--%>
<%--    <div class="selected-area-category-btn">--%>
<%--&lt;%&ndash;        <img src="${pageContext.request.contextPath}/assets/img/icon/greenwhiteBtn.png" alt="selected Area Category Btn">&ndash;%&gt;--%>
<%--    </div>--%>

    <!-- 검색창 -->
    <form class="search-store-section" onsubmit="handleSearch(event)">
        <button type="button" class="magnify-click-btn" onclick="redirectToSearch()">
            <i class="fa-solid fa-magnifying-glass magnify-icon"></i>
        </button>
        <input type="text" placeholder="여기에 음식점 혹은 위치를 검색해보세요." onkeyup="handleEnter(event)">
    </form>

    <script>
        // 엔터 키를 눌렀을 때 검색 실행
        function handleEnter(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // 기본 동작 방지
                redirectToSearch();
            }
        }

        // 폼이 제출될 때 기본 동작을 막고 검색 수행
        function handleSearch(event) {
            event.preventDefault();  // 폼의 기본 제출 동작 막기
            redirectToSearch();
        }

        // 검색어를 쿼리 파라미터로 전달하여 검색 페이지로 이동
        function redirectToSearch() {
            const input = document.querySelector('.search-store-section input');
            if (input) {
                const query = input.value.trim(); // 입력값 읽어오기 및 공백 제거
                if (query) {
                    const encodedQuery = encodeURIComponent(query);
                    console.log(`Redirecting to: https://foodietreee.shop/search?q=\${encodedQuery}`); // 디버깅용 로그
                    location.href = `https://foodietreee.shop/search?q=\${encodedQuery}`;
                } else {
                    alert("검색어를 입력해주세요.");
                }
            } else {
                console.error("Input element not found.");
            }
        }
    </script>


    <!-- 리뷰 게시판 버튼 -->
    <button class="review-main-btn" onclick="location.href='https://foodietreee.shop/reviewMain'">
        <img src="${pageContext.request.contextPath}/assets/img/icon/board.png" alt="Review Board Btn">
    </button>

    <!-- 로그인 및 회원가입 버튼 -->
    <div class="login-btn-section">
<%--        <c:if test="${login == null}">--%>
            <button class="main-page-btn" onclick="location.href='https://foodietreee.shop/main'">주문하러가기</button>
<%--            <div class="dot">・</div>--%>
<%--            <button class="sign-up-btn" onclick="location.href='http://localhost:3000/sign-up'">Sign up</button>--%>
<%--        </c:if>--%>
<%--        <c:if test="${login != null}">--%>
<%--            <a href="/customer/mypage" class="my-info">My Info</a>--%>
<%--            <a href="/customer/sign-out" class="sign-out-btn">Logout</a>--%>
<%--        </c:if>--%>
    </div>

    <!-- 모달 -->
    <div id="sidebar-modal" class="sidebar-modal" style="display: none;">
        <!-- 모달 내용 추가 -->
        <button onclick="toggleModal()">Close</button>
    </div>
</header>
<script>
    function toggleModal() {
        var modal = document.getElementById('sidebar-modal');
        if (modal.style.display === "none") {
            modal.style.display = "block";
        } else {
            modal.style.display = "none";
        }
    }
</script>
</body>
</html>