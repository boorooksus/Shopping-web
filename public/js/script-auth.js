// 회원가입 페이지에서 이메일 중복 체크 페이지로 이동켜주는 함수
function userCheck(){
    var join = document.getElementById("join");
    // 이메일 입력창이 빈 칸인 경우
    if(join.email.value === ""){
        alert("사용할 아이디를 입력해주세요");
        return;
    }

    join.action = 'userCheck';
    join.target="winName";
    join.submit();
}
// 회원가입 페이지에서 다음 단계로 진행시켜주는 함수
function joinCheck(){
    var join = document.getElementById("join");
    // 모든 입력창이 입력되었는지 체크
    for(var i = 0; i < join.length; i++){
        if(join[i].value === ""){
            console.log(join[i] + ": " + join[i].value);
            alert("입력되지 않은 정보가 있습니다.");
            join[i].focus();
            return;
        }
    }
    // 입력된 비밀번호와 비밀번호 확인이 불일치 하는 경우
    if(join.password.value !== join.password_confirm.value){
        alert("비밀번호 확인이 일치하지 않습니다.");
            return;
    }

    join.action = 'join_process';
    join.submit();
}
// 회원 정보 수정 페이지에서 다음 단계로 진행시키는 함수
function updateCheck(){
    var join = document.getElementById("join");
    // 입력칸들 중 빈칸이 존재하는지 체크
    for(var i = 0; i < join.length; i++){
        console.log(join[i].value);
        if(join[i].value === ""){
            alert("입력되지 않은 정보가 있습니다.");
            join[i].focus();
            return;
        }
    }
    // 입력된 비밀번호와 비밀번호 확인이 불일치하는 경우
    if(join.password.value !== join.password_confirm.value){
        alert("비밀번호 확인이 일치하지 않습니다.");
            return;
    }

    join.action = 'update_process';
    join.submit();
}

//function getPrice(product){
//}