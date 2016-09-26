var Logic = function() {
  var i = 0;
  var j = 0;
  var die = 0;            //死亡标记
  var live = 1;           //存活标记
  var maxRow = 0;         //目前细胞活动范围
  var maxColumn = 0;      //
  var baseRow = 0;        //屏幕坐标原点相对位置
  var baseColumn = 0;     //
  var leftFlag = 0;       //该时间片内是否左扩张
  var topFlag = 0;        //            上
  var rightFlag = 0;      //            右
  var buttomFlag = 0;     //            下
  var logicMap = [];      //维护表
  var nextlogicMap = [];  //

  function resize(){                          //存活细胞的范围会随着时间向外面扩散
                                              //通过维护表计量，实现 logci 数组的维护
    leftFlag = 0;
    rightFlag = 0;
    topFlag = 0;
    buttomFlag = 0;

    for(i = 0; i < maxRow; ++i){              //向左扩张
      if(logicMap[i][0] == live){             //需要检查第1列数，存在1，则说明需要向左扩张
        maxColumn += 1;
        baseColumn += 1;
        leftFlag = 1;
        break;
      }
    }
    for(i = 0; i < maxColumn; ++i){           //向上扩张
      if(logicMap[0][i] == live){
        maxRow += 1;
        baseRow += 1;
        topFlag = 1;
        break;
      }
    }
    for(i = 0; i < maxRow-topFlag; ++i){      //向右扩张
      if(logicMap[i][maxColumn-1-leftFlag] == live){
        maxColumn += 1;
        rightFlag = 1;
        break;
      }
    }
    for(i = 0; i < maxColumn-leftFlag; ++i){  //向下扩张
      if(logicMap[maxRow-1-topFlag][i] == live){
        maxRow += 1;
        buttomFlag = 1;
        break;
      }
    }
  };
  var nextRound = function(){                               //新的时间片内判断细胞存活
    nextlogicMap = [];
    var originRow = maxRow - topFlag - buttomFlag;          //原行数
    var originColumn = maxColumn - leftFlag - rightFlag;    //原列数
    for(i = 0; i < maxRow; i+=1){                           //初始化新表
      nextlogicMap[i] = [];
      for(j = 0; j < maxColumn; j+=1){
        nextlogicMap[i][j] = die;
      }
    }
    for(i = 1; i < originRow-1; i+=1){                      //首先判断原来范围内现在细胞存活
      for(j = 1; j < originColumn-1; j += 1){
        var count = logicMap[i-1][j-1] + logicMap[i-1][j] + logicMap[i-1][j+1] +
                    logicMap[i][j-1] +                        logicMap[i][j+1] +
                    logicMap[i+1][j-1] + logicMap[i+1][j] + logicMap[i+1][j+1];
        if(count == 3){
          nextlogicMap[i+topFlag][j+leftFlag] = live;
        }
        if(count == 2){
          nextlogicMap[i+topFlag][j+leftFlag] = logicMap[i][j];
        }
      }
    }
    for(i = 1; i < originRow-1; i+=1){                      //判断左边界是否有新细胞
      var count = logicMap[i-1][1]+logicMap[i][1]+logicMap[i+1][1];
      if(count == 3){
        nextlogicMap[i+topFlag][0+leftFlag] = live;
      }
    }
    for(i = 1; i < originRow-1; i+=1){                      // 右边界
      var count = logicMap[i-1][originColumn-2] + logicMap[i][originColumn-2] + logicMap[i+1][originColumn-2];
      if(count == 3){
        nextlogicMap[i+topFlag][originColumn-1+leftFlag] = live;
      }
    }
    for(i = 1; i < originColumn-1; i+=1){                   //上边界
      var count = logicMap[1][i-1] + logicMap[1][i] + logicMap[1][i+1];
      if(count == 3){
        nextlogicMap[0+topFlag][i+leftFlag] = live;
      }
    }
    for(i = 1; i < originColumn-1; i +=1){                  //下边界
      var count = logicMap[originRow-2][i-1] + logicMap[originRow-2][i] + logicMap[originRow-2][i+1];
      if(count == 3){
        nextlogicMap[originRow-1+topFlag][i+leftFlag] = live;
      }
    }
    logicMap = nextlogicMap;                              //更新表
  }

  var public = {
    initialize: function(row, column){                    //初始化函数，申请表空间
        maxRow = row+2;
        maxColumn = column+2;
        baseRow = 1;
        baseColumn = 1;
        for(i = 0; i < maxRow; i+=1){
          logicMap[i] = [];
          for(j = 0; j < maxColumn; j+=1){
            logicMap[i][j] = die;
          }
        }
    },
    randomize: function(){                                //随机分布表内的存活细胞
                                                          //这里是0.15几率存活
      for(i = 1; i < maxRow-1; i+=1){
        for(j = 1; j < maxColumn-1; j+=1){
          logicMap[i][j] = (Math.random()>0.85)? live:die;
        }
      }
    },
    update: function(){
      resize();
      nextRound();
    },
    get: function(ypos, xpos){
      return logicMap[ypos+1+baseRow][xpos+1+baseColumn];
    },
  };
  return public;
}
