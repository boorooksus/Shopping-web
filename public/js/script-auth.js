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
    console.log(join.email.value);
    for(var i = 0; i < join.length; i++){
        console.log(join[i].value);
        if(join[i].value === ""){
            alert("입력되지 않은 정보가 있습니다.");
            join[i].focus();
            return;
        }
    }
    join.action = 'join_process';
    join.submit();
}