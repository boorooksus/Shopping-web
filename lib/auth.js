module.exports = {
    isLogined:function(request, response){
        if(request.session.is_logined){
            return true;
        }
        else{
            return false;
        }
    },

    isAdmin:function(request, response){
        if(request.session.is_admin){
            return true;
        }
        else{
            return false;
        }
    },

    statusUi:function(request, response){
        var authStatusUi = `
            <a class="navbar-brand" href="/auth/login">Login</a>

            <a class="navbar-brand" href="/auth/join">Join</a>
        `;
        if(this.isLogined(request, response)){
            authStatusUi = `
            <span class="navbar-brand"><strong>${request.session.name}</strong>님</span>
            <a class="navbar-brand" href="/auth/update/${request.session.user_id}">회원정보</a>
            `;
            if(request.session.is_admin){
                authStatusUi += `<a class="navbar-brand" href="/admin" id="management">관리자 페이지</a>`
            } else{
                authStatusUi += `<a class="navbar-brand" href="/auth/cart">장바구니</a>`
            }
            authStatusUi += `
            <a class="navbar-brand" href="/auth/logout">로그아웃</a>
            `;
        }
        return authStatusUi;
    },

    productUi:function(request, response, productId){
        var productUi = `
        <form action="/auth/add_cart" method="post" target="_blank">
        <input type="hidden" name="id" value="${productId}">
        <input type="number" id="count" class="form-control" name="count" max="100" min="1" value=1>
        <button type="submit" class="btn btn-success">장바구니 담기</button>
        </form>
        `;
        if(this.isAdmin(request, response)){
            productUi = `
            <button class="btn btn-warning"><a href="/product/update_product/${productId}">상품 수정</a></button>
            <button class="btn btn-danger" onclick="return confirm('Do you want to delete?')"><a href="/product/delete_product/${productId}">상품 삭제</a></button>
            `;
            
        }
        return productUi;
    }
}