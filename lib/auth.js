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
            <a class="navbar-brand" href="#">${request.session.name}님</a>
            <a class="navbar-brand" href="/auth/logout">logout</a>
            `;
            if(request.session.is_admin){
                authStatusUi += `<a class="navbar-brand" href="#">관리자 페이지</a>`
            } 
        }
        return authStatusUi;
    }
}