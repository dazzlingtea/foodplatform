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
              <div class="wrapper">
                  <h1><span class="explanation">FOODIE TREE 에</span> 입점 시 얻을 수 있는 </h1>
                  <h2>특별한 경험에는 무엇이 있을까요?</h2>
                  <p>우리 가게에서 판매하고 버려지는</p>
                  <p>음식물을 최소화하여 환경을 보호하고</p>
                  <p>지역사회에 우리 가게에 대해 </p>
                  <p>이미지를 심어줄 수 있어요!</p>
              </div>
              <div class="signup-image">
                  <img src="${pageContext.request.contextPath}/assets/img/main-quote/signupImage.jpg" alt="Sign Up Image" id="signup-image">
              </div>
          </div>
          <div class="right">
              <div class="store-signup">
               <span>입점신청</span>
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
          // 알림을 띄운 후 확인 버튼 클릭 시 동작
          if (confirm("입점신청은 로그아웃 후 진행됩니다. 확인을 누르시면 로그아웃됩니다.")) {
              // 지정된 URL로 리다이렉트
              window.location.href = "http://localhost:3000/sign-up?r=guest";
          }
      });
  </script>

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
