module.exports = {
    topbar:function(authStatusUi){
        return `
        <nav id="topbar" class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a id="logo" class="navbar-brand" href="/">Shopping Mall</a>  
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
                    <a href="#">ALL</a>
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
</head>
<body>
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