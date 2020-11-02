module.exports = {
    topbar:function(authStatusUi){
        return `
        <nav id="topbar" class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a id="logo" class="navbar-brand" href="/">Shopping Mall</a>
 
        <a id="menu" class="navbar-brand" href="#" onclick="showMenu()">Menu</a>

        ${authStatusUi}
        <ul class="navbar-nav mr-auto">
        </ul>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-primary my-2 my-sm-0" type="submit">검색</button>
          </form>    

      </nav>
        `;
    },
    leftbar:function(){
        return `
        <nav id="sidebar">

            <ul class="list-unstyled components">
                <li class="active">
                    <a href="/products/all/1">ALL</a>
                </li>
                
                <li>
                    <a href="#">TOP</a>
                </li>
                <li>
                    <a href="#">SHIRTS</a>
                    
                </li>
                <li>
                    <a href="#">PANTS</a>
                </li>
                <li>
                    <a href="#">ACC</a>
                </li>
            </ul>
        </nav>
        `;
    },

    html:function(authStatusUi, contents){
        return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <title>Shopping Mall</title>
    <link rel="stylesheet" href="/css/style.css">
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