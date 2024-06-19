<%@ page contentType="text/html; charset=UTF-8" language="java" %> <%@ taglib
prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>

  <style>
    #idmessage{
      display: block;
      border-color: black;

      .success{
        color: blue;
      }
      
      .warning{
        color: red;
      }
    }
  </style>

</head>

<body>
  <p>
    <input type="text" id="username">
    <span id="idmessage"></span>
  </p>

  <script>

    // 계정 중복검사 비동기 요청 보내기
    async function idCheck(idValue){

      const res = await fetch(`http://localhost:8083/SignUp/check?type=account&keyword=\${idValue}`);

      const flag = await res.json();
      console.log(flag);
      idFlag = flag;
    }
    
    // 계정 입력 검증
    const $idInput=document.getElementById('username');
    
    let idFlag=false;
    
    $idInput.addEventListener('keyup', async(e)=>{
      
      // 아이디 검사 정규표현식
      const accountPattern = /^[a-zA-Z0-9]{4,14}$/;
      
      // 입력값 읽어오기
      const idValue = $idInput.value;
      
      // 검증 메시지를 입력할 span
      const $idCheck=document.getElementById('idmessage');
      
      // console.log(e.target.value);
      
      
      // 아이디 입력값에 대한 결과
      if(idValue.trim()===''){
        $idInput.style.borderColor='red';
        $idCheck.innerHTML='<b class="warning">[아이디는 필수값입니다.]</b>'
      }else if(!accountPattern.test(idValue)){
        $idInput.style.borderColor='red';        
        $idCheck.innerHTML='<b class="warning">[아이디는 4~14글자 사이 영문, 숫자로 입력해주세요.]</b>'
      }else{

        // 아이디 중복 검사
        await idCheck(idValue);

        if(idFlag){
          $idCheck.style.borderColor="red";
          $idCheck.innerHTML='<b class="warning">[아이디가 중복되었습니다. 다른 아이디를 사용해주세요.]</b>'
        }else{
          $idInput.style.borderColor='blue';
          $idCheck.innerHTML='<b class="success">[사용가능한 아이디입니다.]</b>'
        }
      }
    })

  </script>
</body>
</html>