<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Angular-Laravel Authentication</title>
    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.css">
</head>
<body ng-app="authApp">

<div class="container">
    <div ui-view></div>
</div>

</body>

<!-- Application Dependencies -->
<script data-rocketsrc="node_modules/angular/angular.js" type="text/rocketscript"></script>
<script data-rocketsrc="node_modules/angular-ui-router/build/angular-ui-router.js" type="text/rocketscript"></script>
<script data-rocketsrc="node_modules/satellizer/satellizer.js" type="text/rocketscript"></script>

<!-- Application Scripts -->
<script data-rocketsrc="scripts/app.js" type="text/rocketscript"></script>
<script data-rocketsrc="scripts/authController.js" type="text/rocketscript"></script>
<script data-rocketsrc="scripts/userController.js" type="text/rocketscript"></script>
</html>
