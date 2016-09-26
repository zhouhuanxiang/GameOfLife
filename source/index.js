
$(document).ready(function(){
  var canvas = document.getElementById("canvas_container");
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
      map = new Map(ctx);
      map.initialize(canvas.height, canvas.width); // 初始化
    }
});
