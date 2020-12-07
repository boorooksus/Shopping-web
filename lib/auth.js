module.exports = {
    // 로그인 여부 체크 함수
    isLogined:function(request, response){
        if(request.session.is_logined){
            return true;
        }
        else{
            return false;
        }
    },
    // 관리자 계정으로 로그인 되었는지 여부 체크 함수
    isAdmin:function(request, response){
        if(request.session.is_admin){
            return true;
        }
        else{
            return false;
        }
    },
    // 상단바의 로그인 상태 ui
    statusUi:function(request, response){
        // 로그인 안된 상태
        var authStatusUi = `
            <a class="navbar-brand" href="/auth/login">Login</a>

            <a class="navbar-brand" href="/auth/join">Join</a>
        `;
        // 로그인 된 경우
        if(this.isLogined(request, response)){
            authStatusUi = `
            <span class="navbar-brand"><strong>${request.session.name}</strong>님</span>
            <a class="navbar-brand" href="/auth/update/${request.session.user_id}">회원정보</a>
            `;
            // 관리자로 로그인 된 경우
            if(request.session.is_admin){
                authStatusUi += `<a class="navbar-brand" href="/admin" id="management">관리자 페이지</a>`
            } 
            // 일반 유저가 로그인 된 경우
            else{
                authStatusUi += `<a class="navbar-brand" href="/auth/cart">장바구니</a>`
            }
            authStatusUi += `
            <a class="navbar-brand" href="/auth/logout">로그아웃</a>
            `;
        }
        return authStatusUi;
    },
    // 상품 상세보기 페이지의 구매 버튼 ui
    productUi:function(request, response, productId){
        // 기본 ui
        var productUi = `
        <form action="/auth/add_cart" method="post" target="_blank">
        <input type="hidden" name="id" value="${productId}">
        <input type="number" id="count" class="form-control" name="count" max="100" min="1" value=1>
        <button type="submit" class="btn btn-success">장바구니 담기</button>
        </form>
        `;
        // 관리자 계정인 경우의 ui
        if(this.isAdmin(request, response)){
            productUi = `
            <button class="btn btn-warning"><a href="/product/update_product/${productId}">상품 수정</a></button>
            <button class="btn btn-danger" onclick="return confirm('Do you want to delete?')"><a href="/product/delete_product/${productId}">상품 삭제</a></button>
            `;
            
        }
        return productUi;
    }
}