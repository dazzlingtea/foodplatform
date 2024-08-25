<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<%
    java.util.logging.Logger logger = java.util.logging.Logger.getLogger("MyLogger");
    logger.info("Stores by Product Count: " + request.getAttribute("storesByProductCount"));
    logger.info("Stores by End Time: " + request.getAttribute("storesByEndTime"));
%>


<!-- 디버깅: 현재 값 출력하기 -->
<div>
    <h3>Debug Information</h3>
    <p>Stores by Product Count: ${storesByProductCount}</p>
    <p>Stores by End Time: ${storesByEndTime}</p>
</div>

<!-- 데이터 렌더링: CO2를 가장 많이 줄인 가게 -->
<div id="co2-saver-list">
    <img src="${pageContext.request.contextPath}/assets/img/main-quote/co2saversans.png" alt="Co2 Saver" id="co2-title-img">
    <span class="sub-title">Co2 감소에 가장 많이 기여한 가게</span>
    <div class="list">
        <div class="list-container co2-saver-section">
            <c:forEach var="store" items="${storesByProductCount}">
                <div class="storeItem ${store.productCnt == 0 ? 'low-stock' : ''}">
                    <img src="${pageContext.request.contextPath}${store.storeImg}" alt="${store.storeName}" onerror="this.onerror=null; this.src='${pageContext.request.contextPath}/assets/img/defaultImage.jpg';">
                    <p class="storeName">${store.storeName}</p>
                    <span class="storeCo2">🪴${store.coTwo}</span>
                    <span class="reputation">✰ 4.5</span>
                    <span class="store-area">(${store.address})</span>
                        ${store.productCnt == 0 ? '<div class="overlay">SOLD OUT</div>' : ''}
                </div>
            </c:forEach>
        </div>
    </div>
</div>

<!-- 데이터 렌더링: 마감 임박 상품 -->
<div id="end-soon-list">
    <img src="${pageContext.request.contextPath}/assets/img/main-quote/endsoongreensans.png" alt="It Will End Soon" id="end-title-img">
    <span class="sub-title">곧 마감되는 상품이에요! 서두르세요!</span>
    <c:choose>
        <c:when test="${empty storesByEndTime}">
            <!-- 상품이 없는 경우 표시할 내용 -->
            <div id="end-soon-list">
                <img src="${pageContext.request.contextPath}/assets/img/main-quote/nowaythereisnofood.png" alt="It Will End Soon" id="no-way-img">
            </div>
        </c:when>
        <c:otherwise>
            <!-- 상품이 있는 경우 표시할 내용 -->
            <div class="list">
                <div class="list-container end-time-soon-section">
                    <c:forEach var="store" items="${storesByEndTime}">
                        <div class="storeItem ${store.productCnt == 0 ? 'low-stock' : ''}">
                            <img src="${pageContext.request.contextPath}${store.storeImg}" alt="${store.storeName}" onerror="this.onerror=null; this.src='${pageContext.request.contextPath}/assets/img/defaultImage.jpg';">
                            <p class="storeName">${store.storeName}</p>
                            <span class="storePrice">${store.price}원</span>
                            <span class="productCnt">${store.productCnt}개 남았어요!</span>
                            <span class="remainingTime">${store.remainingTime} 남았어요!</span>
                            <span class="store-area">(${store.address})</span>
                                ${store.productCnt == 0 ? '<div class="overlay">SOLD OUT</div>' : ''}
                        </div>
                    </c:forEach>
                </div>
            </div>
        </c:otherwise>
    </c:choose>
</div>
<!-- JavaScript 파일 임포트 -->
<%--<script defer type="module" src="/assets/js/store/store-by-endtime.js"></script>--%>
<%--<script defer type="module" src="/assets/js/store/store-by-product-cnt.js"></script>--%>

<%--      co2 saver--%>
<%--<div id="co2-saver-list">--%>
<%--    <img src="${pageContext.request.contextPath}/assets/img/main-quote/co2saversans.png" alt="Co2 Saver" id="co2-title-img">--%>
<%--    <span class="sub-title">Co2 감소에 가장 많이 기여한 가게 . </span>--%>
<%--    <div class="list">--%>
<%--        <div class="list-container co2-saver-section">--%>
<%--        </div>--%>
<%--    </div>--%>
<%--</div>--%>
<%--   오늘 마감 임박 --%>
<%--<div id="end-soon-list">--%>
<%--    <img src="${pageContext.request.contextPath}/assets/img/main-quote/endsoongreensans.png" alt="It Will End Soon" id="end-title-img">--%>
<%--    <span  class="sub-title"> 곧 마감되는 상품이에요 ! 서두르세요 !  </span>--%>
<%--    <div class="list">--%>
<%--        <div class="list-container end-time-soon-section">--%>
<%--        </div>.--%>
<%--    </div>--%>
<%--</div>--%>








