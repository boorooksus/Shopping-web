module.exports = {
    // 상단 네비게이션 바 html 코드
    topbar:function(authStatusUi){
        return `
        <nav id="topbar" class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a id="logo" class="navbar-brand" href="/">Shopping Mall</a>
 
        <a id="menu" class="navbar-brand" href="#" onclick="showMenu()">Menu</a>

        ${authStatusUi}
        <ul class="navbar-nav mr-auto">
        </ul>
          <form class="form-inline my-2 my-lg-0" action="/products/search_process" method="post">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" name="term">
            <button class="btn btn-primary my-2 my-sm-0" type="submit">검색</button>
          </form>    

      </nav>
        `;
    },
    // 좌측 네비게이션 바 html 코드
    leftbar:function(){
        return `
        <nav id="sidebar">

            <ul class="list-unstyled components">
                <li class="active">
                    <a href="/products/all/1">ALL</a>
                </li>
                <li>
                    <a href="/products/top/1">Top</a>
                </li>

                <li>
                    <a href="/products/outer/1">Outer</a>
                </li>
                <li>
                    <a href="/products/pants/1">Pants</a>
                    
                </li>
                <li>
                    <a href="/products/acc/1">ACC</a>
                </li>
            </ul>
        </nav>
        `;
    },
    // 웹페이지 기본 template 코드(상단 네비게이션바 + 좌측 네비게이션바 + contents)
    html:function(authStatusUi, contents){
        return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <title>Shopping Mall</title>
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/style-auth.css">
    <link rel="stylesheet" href="/css/style-products.css">
    <link rel="stylesheet" href="/css/style-product.css">
    <link rel="stylesheet" href="/css/style-admin.css">
    <script type="text/javascript" src="/js/script.js"></script>
    <script>
        function showMenu(){
            var sidebar = document.getElementById("sidebar");
            console.log(sidebar.style.marginLeft);
            if(sidebar.style.marginLeft === "0px"){
                sidebar.style.marginLeft = -180 + "px";
            } else{
                sidebar.style.marginLeft = 0;
            }
        }

        function onresize() {
            var width = document.body.clientWidth;
            var sidebar = document.getElementById("sidebar");
            var menu = document.getElementById("menu");
            if(width < 768){
                menu.style.visibility = "visible";
                sidebar.style.marginLeft = -180 + "px";
            } else{
                menu.style.visibility = "hidden";
                sidebar.style.marginLeft = 0;
            }
        }
        window.addEventListener("resize", onresize);
    </script>
</head>
<body onload="onresize()">
    ${this.topbar(authStatusUi)}

    <div class="wrapper">
        <!-- Sidebar  -->
        ${this.leftbar()}

        <!-- Page Content  -->
        <div id="content">
        ${contents}
    </div>   
</body>
</html>
    `;
    }
}