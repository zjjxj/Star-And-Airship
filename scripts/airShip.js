(function(global) {
    /**
     * 飞船类
     * @param id
     * @param reduce
     * @param add
     * @param speed
     * @constructor
     */
    function AirShip(id,reduce,add,speed) {
        this.id=id;
        this.REDUCE_ENERGY_SPEED=reduce;
        this.ADD_ENERGY_SPEED=add;
        this.FLY_SPEED=speed;
    }
    var radius={};   //保存每个轨道飞船半径
    var degree={};   //起始角度
    var timer1={};   //能源系统定时器

    AirShip.prototype={
        state:"stop",               //状态
        freeEnergy:100,             //剩余能源
        flag:"new",                 //标记飞船是否为新建飞船
        beginFly:function () {      //速度为每秒20px
            this.state="fly";
            this.energySystem();
            var that=this;
            var elem=document.getElementById(that.id);
            if(that.flag==="new"){
                that.flag="old";
                degree[that.id]=0;
                radius[that.id]=parseInt(elem.style.top)-275;
            }
                var speed=that.FLY_SPEED/10;
                var preDeg=speed*360/(Math.PI*2*radius[that.id]);
                setTimeout(function () {
                    degree[that.id]+=preDeg;
                    var newX = Math.sin(degree[that.id]* Math.PI/180 ) * radius[that.id];
                    var newY = Math.cos(degree[that.id]* Math.PI/180 )* radius[that.id];
                    elem.style.left = Math.round(newX)+275+'px';
                    elem.style.top = Math.round(newY) +275+ 'px';
                    if(that.state!=="stop"){
                        setTimeout(arguments.callee,100);
                    }
                },100);
                this.sendSignal();
        },
        stopFly:function () {
            clearInterval(timer1[this.id]);
            this.state="stop";
        },
        destroyShip:function () {
            var that=this;
            signals=signals.filter(function (item) {
                if(item.slice(3,4)===that.id){
                    return false;
                }
                return true;
            });
            this.stopFly();
            $("#universe").removeChild(document.getElementById(this.id));
            delete airShips[this.id];
        }
    };
    
    AirShip.prototype.energySystem=function () {   //能源系统
        var that=this;
        if(that.freeEnergy!==0&&that.state!=="stop"){
             timer1[that.id]=setInterval(function () {
                if(that.freeEnergy-that.REDUCE_ENERGY_SPEED>=0&&that.state==="fly"){
                    that.freeEnergy-=that.REDUCE_ENERGY_SPEED;
                }else{

                    that.freeEnergy=0;
                    that.state="stop";
                    clearInterval(timer1[that.id]);
                     var timer2= setInterval(function () {
                        if(that.freeEnergy+that.ADD_ENERGY_SPEED<=100){
                            that.freeEnergy+=that.ADD_ENERGY_SPEED;
                        }else{
                            that.freeEnergy=100;
                            clearInterval(timer2);
                        }
                        document.getElementById(that.id).getElementsByTagName("span")[0].innerHTML=that.freeEnergy+"%";
                    },1000)
                }
                document.getElementById(that.id).getElementsByTagName("span")[0].innerHTML=that.freeEnergy+"%";
            },1000)
        }
    };

    AirShip.prototype.receiveCommand=function (commandObj) {   //信号接收处理系统
        var command=Adapter(commandObj).command;
        switch (command){
            case "fly":
                this.beginFly();
                break;
            case "stop":
                this.stopFly();
                break;
            case "destroy":
                this.destroyShip();
                break;
        }
    };

    AirShip.prototype.sendSignal=function () {    //信号发送器
        var that=this;
        var timer=setTimeout(function () {
            var num=that.id;
            var state=that.state;
            var freeEnergy=that.freeEnergy;
            var speed="" ,energy="";
            switch (that.ADD_ENERGY_SPEED){
                case 2:
                    energy="劲量型";
                    break;
                case 3:
                    energy="光能型";
                    break;
                case 4:
                    energy="永久型";
                    break;
            }
            switch (that.FLY_SPEED){
                case 30:
                    speed="前进号";
                    break;
                case 50:
                    speed="奔腾号";
                    break;
                case 80:
                    speed="超越号";
                    break;
            }
            if(airShips[that.id]) {
                receiveSignal("飞船：" + num + "号" + "  动力系统：" + speed + "  能源系统：" + energy + "  当前飞行状态：" + state + "  剩余能耗：" + freeEnergy + "%", timer,that)
            }
            if(document.getElementById(that.id)){
                setTimeout(arguments.callee,1000);
            }
            },1000)
    };

    global.AirShip=AirShip;

}(this));
