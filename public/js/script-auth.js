function userCheck(){
    var join = document.getElementById("join");
    console.log(join.email.value);
    if(join.email.value === ""){
        alert("사용할 아이디를 입력해주세요");
        return;
    }
    join.action = 'userCheck';
    join.target="winName";
    join.submit();
}

function joinCheck(){
    var join = document.getElementById("join");
    for(var i = 0; i < join.length; i++){
        if(join[i].value === ""){
            console.log(join[i] + ": " + join[i].value);
            alert("입력되지 않은 정보가 있습니다.");
            join[i].focus();
            return;
        }
    }
    if(join.password.value !== join.password_confirm.value){
        alert("비밀번호 확인이 일치하지 않습니다.");
            return;
    }

    join.action = 'join_process';
    join.submit();
}

function updateCheck(){
    var join = document.getElementById("join");
    for(var i = 0; i < join.length; i++){
        console.log(join[i].value);
        if(join[i].value === ""){
            alert("입력되지 않은 정보가 있습니다.");
            join[i].focus();
            return;
        }
    }
    if(join.password.value !== join.password_confirm.value){
        alert("비밀번호 확인이 일치하지 않습니다.");
            return;
    }

    join.action = 'update_process';
    join.submit();
}

function getPrice(product){

}