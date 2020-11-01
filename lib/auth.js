module.exports = {
    isLogined:function(request, response){
        if(request.session.is_logined){
            return true;
        }
        else{
            return false;
        }
    },

    statusUi:function(request, response){
        var authStatusUi = `
            <a class="navbar-brand" href="#">Login</a>

            <a class="navbar-brand" href="#">Join</a>
        `;
        if(this.isLogined(request, response)){
            authStatusUi = `
            <a class="navbar-brand" href="#">${request.session.nickname}님</a>
            <a class="navbar-brand" href="#">logout</a>
            `;
            if(request.session.is_admin){
                authStatusUi += `<a class="navbar-brand" href="#">관리자 페이지</a>`
            }
        }
        return authStatusUi;
    }
}