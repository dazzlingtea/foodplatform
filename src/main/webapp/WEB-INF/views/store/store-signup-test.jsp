<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<form action="/store/sign-up" id="signupData" method="post">
    <label>
        #가게아이디: <input type="text" name="account" id="account">
    </label>
    <label>
        #가게 비밀번호: <input type="text" name="password" id="pw">
    </label>
        <button type="submit" id="signUpBtn">회원가입</button>
</form>
</body>

<script>
    const $pw = document.getElementById("pw");
    const $id = document.getElementById("id");
    const $form =document.getElementById("signupData");
    const $btn = document.getElementById("signUpBtn");
    $btn.addEventListener('click', e => {
        console.log($pw.value);
        console.log($id.value);
        console.log($form);
    });
</script>
</html>