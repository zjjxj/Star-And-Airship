(function (global) {
    /**
     * 指挥中心信号发射器
     * @type {{createShip: command.createShip, beginFly: command.beginFly, stopFly: command.stopFly, destroyShip: command.destroyShip}}
     */
    var command={
        createShip:function (id,reduce,add,speed) {
            if(!airShips[id]){
                airShips[id]=new AirShip(id,reduce,add,speed);
                var newShip=document.createElement("div");
                newShip.setAttribute("id",id);
                newShip.setAttribute("class","airship");
                newShip.setAttribute("style","left: "+site[id-1][0]+";top:"+site[id-1][1]);
                newShip.innerHTML=id+"号 "+"<br/><span>100%</span>";
                $("#universe").appendChild(newShip);
            }
        },
        beginFly:function (id) {
            if(airShips[id].state==="stop"){
                Mediator(Adapter({id:id,command:"fly"}));
            }
        },
        stopFly:function (id) {
            if(airShips[id].state==="fly"){
                Mediator(Adapter({id:id,command:"stop"}));
            }
        },
        destroyShip:function (id) {
            if(airShips[id]){
                Mediator(Adapter({id:id,command:"destroy"}));
            }
        }
    };
    
    /**
     * 指挥中心信号接收器，接收飞船信号显示于屏幕
     * @param obj
     * @param time
     * @param ship
     */
    function receiveSignal(obj,time,ship) {
        if(signals.indexOf(obj)===-1){
            if(ship.freeEnergy!==0){
                signals.push(obj)
            }
            $("textarea").value+=(obj+"\n");
            if(signals.length>=$("textarea").rows){    //文本框滚动条滚动
                $("textarea").scrollTop+=30;
            }
        }else{
            clearInterval(time)
        }
    }

    global.command=command;
    global.receiveSignal=receiveSignal;
}(this));
