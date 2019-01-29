<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>jsTree test</title>
    <script src="<%=request.getContextPath() %>/js/three.js"></script>
    <script src="<%=request.getContextPath() %>/js/OrbitControls.js"></script>
    <script src="<%=request.getContextPath() %>/js/DDSLoader.js"></script>
    <script src="<%=request.getContextPath() %>/js/MTLLoader.js"></script>
    <script src="<%=request.getContextPath() %>/js/OBJLoader.js"></script>
    <script src="<%=request.getContextPath() %>/js/TGALoader.js"></script>
    <script>
        var locationPath = "<%=request.getContextPath() %>";
    </script>
    <!-- 2 load the theme CSS file -->
</head>
<body>
<!-- 3 setup a container element -->
<div id="jstree">

</div>
<button>demo button</button>
<!-- 4 include the jQuery library -->
<!--<script src="jquery.min.js"></script>-->
<!-- 5 include the minified jstree source -->

<script src="<%=request.getContextPath() %>/js/obj.js"></script>
</body>
</html>