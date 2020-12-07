// 상품 등록 페이지에서 입력창이 모두 작성돼 있는지 체크 여부 알려주는 함수
function addCheck(){
    var add = document.getElementById("add_product");
    for(var i = 0; i < add.length; i++){

        if(add[i].value === ""){
            alert("입력되지 않은 정보가 있습니다.");
            add[i].focus();
            return;
        }
    }
    add.submit();
}