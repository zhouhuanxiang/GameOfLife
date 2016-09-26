var Map = function(ctx){
  var cellSize = 20;      //代表细胞的方框大小
  var logic;              //含有成员 logic，控制逻辑
  var row = 0;            //
  var column = 0;         //

  function draw(){
    var i = 0;
    var j = 0;
    ctx.fillStyle = "rgb(128,128,128)";
    ctx.fillRect(0,0,cellSize*column, cellSize*row);
    for(i = 0; i < row; ++i){
      for(j = 0; j < column; ++j){
        if(logic.get(i,j) == 0){                //从 logic 获取细胞存存活信息，对其
          ctx.fillStyle = "rgb(0,0,0)";         //不同的颜色染色
        }
        else{
          ctx.fillStyle = "rgb(256,128,128)";
        }
        ctx.fillRect(j*cellSize-1, i*cellSize-1, cellSize-2, cellSize-2);
      }
    }
  }

  var public = {
    initialize: function(height, width){       //map 的初始化函数
        row = height/cellSize;
        column = width/cellSize;
        logic = new Logic();                  //对成员 logic进行创建、初始化、随机分布存活细胞
        logic.initialize(row, column);
        logic.randomize();

        draw();                               //
        setInterval(function() {              //由于时钟处理比较简单，所以写在 Map 里
          logic.update();                     //定期按时间跟新 logic 并绘制
          draw();
        }, 500);
    }
  };
  return public;
}
