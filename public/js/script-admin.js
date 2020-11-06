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