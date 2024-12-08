<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8" %> <%@ taglib prefix="c"
uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FoodieTree</title>
    <link rel="stylesheet" href="/assets/css/index.css" />
    <!-- 구글폰트 -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap"
      rel="stylesheet"
    />
    <!-- 구글폰트2 -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Gaegu&display=swap"
      rel="stylesheet"
    />

<%--      구글폰트 3 --%>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR&display=swap" rel="stylesheet">

<%--     system font--%>
    <style>
      :root {
        font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
        font-size: 16px;
        line-height: 24px;
        font-weight: 400;
        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
      }
    </style>
  </head>


<%--  body start--%>
  <body>
  <!-- 공통헤더 -->
  <%@ include file="include/header.jsp" %>



  <section class="hero">

      <!-- 검색창 -->
      <form class="sub-search-store-section" onsubmit="handleSearch(event)">
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
              const input = document.querySelector('.sub-search-store-section input');
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


      <div class="main-box">
<%--              로고--%>
              <div class="main-logo">
            <img src="${pageContext.request.contextPath}/assets/img/icon/greenlogo.png" alt="Green Foodie Tree Logo">
              </div>
<%--    save the earth--%>
            <div class="save-quote">
            <img src="${pageContext.request.contextPath}/assets/img/main-quote/greensave.png" alt="Save The Earth">
            </div>
<%--        savor the taste--%>
            <div class="savor-quote">
            <img src="${pageContext.request.contextPath}/assets/img/main-quote/greenlettersavor.png" alt="Savor The Taste">
            </div>
      </div>
  </section>

  <section class="guest-store-list-section">
      <%@ include file="./guestProductPage.jsp" %>
  </section>

  <section class="info-for-store">
      <div class="container">
          <div class="left">
              <div class="signup-image">
                  <img src="${pageContext.request.contextPath}/assets/img/icon/greenicecream.png" alt="store-signup-images">
              </div>
              <div class="wrapper">
                  <h1><span class="explanation">FOODIE TREE 에</span> 입점 시 얻을 수 있는</h1>
                  <h2>특별한 경험에는 무엇이 있을까요?</h2>
                  <p>우리 가게에서 판매하고 버려지는</p>
                  <p>음식물을 최소화하여 환경을 보호하고</p>
                  <p>지역사회에 우리 가게에 대해</p>
                  <p>긍정적인 이미지를 심어줄 수 있어요!</p>

                  <div class="right">
                      <div class="store-signup">
                          <span>입점 신청</span>
                      </div>
                  </div>
              </div>

          </div>

      </div>
  </section>


  <!-- 공통 푸터 -->
  <footer>
      <%@ include file="include/footer.jsp" %>
  </footer>

  <script>
      const $storeSignup = document.querySelector(".store-signup");
      $storeSignup.addEventListener("click", () => {
          // 지정된 URL로 리다이렉트
          window.location.href = "https://foodietreee.shop/sign-up?r=guest";
      });

  document.addEventListener('click', function(event) {
  const emojis = ['🍃', '🌿', '🍀', '🍂', '🌱'];

  for (let i = 0; i < 10; i++) {
  const leaf = document.createElement('div');
  leaf.classList.add('leaf');
  leaf.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  // Calculate a random position offset around the click point
  const offsetX = (Math.random() - 0.5) * 100;
  const offsetY = (Math.random() - 0.5) * 100;

  // Adjust the position to account for scrolling
  const xPosition = event.clientX + offsetX + window.scrollX;
              const yPosition = event.clientY + offsetY + window.scrollY;

              leaf.style.position = 'absolute';
              leaf.style.left = `${xPosition}px`;
              leaf.style.top = `${yPosition}px`;

              leaf.style.opacity = Math.random() * 0.5 + 0.5;

              document.body.appendChild(leaf);

              const duration = Math.random() * 2 + 2;
              leaf.style.animation = `leaf-fall ${duration}s linear`;

              leaf.addEventListener('animationend', function() {
                  leaf.remove();
              });
          }
      });
  </script>


  </body>
<%--    body end point--%>

</html>
