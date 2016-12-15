(function (global) {
    var Mediator=function (param) {     //模拟丢包
        setTimeout(function () {
            var num=Math.ceil(Math.random()*10);
            for(var key in airShips){
                if(key===parseInt(param.slice(0,4),2).toString()&&num>1){
                    airShips[key].receiveCommand(param);
                }
            }
        },1000)
    };
    global.Mediator=Mediator;
}(this));