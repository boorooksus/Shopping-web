// 가격에 콤마를 표시해주는 함수
function showPrice(price){
    var ret = "";
    var price = price.toString();
    //console.log("price: " + price);
    //console.log("price len: " + price.length);
    var temp = 0;
    for(var i = price.length - 1; i >= 0; i--){
        if(temp != 0 && temp % 3 == 0){
            ret = "," + ret;
        }
        ret = price[i] + ret;
        temp++;
    }

    document.write(ret);
}