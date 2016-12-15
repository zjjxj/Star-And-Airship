    var $=function (el) {
        return document.querySelector(el);
    };
    
    var buttons1=$("#control1").getElementsByTagName("button");
    var buttons2=$("#control2").getElementsByTagName("button");
    var buttons3=$("#control3").getElementsByTagName("button");
    var buttons4=$("#control4").getElementsByTagName("button");
    var airShips={};//已创建的飞船
    var signals=[];  //屏幕上显示的状态信息
    var site=[[275+"px",380+"px"],[275+"px",430+"px"],[275+"px",480+"px"],[275+"px",530+"px"]];//飞船起始位置

    $("#command").onclick=function (e) {
        if(e.target===buttons1[0]||e.target===buttons2[0]||e.target===buttons3[0]||e.target===buttons4[0]){
            var powers=document.getElementsByName("power"),
                energys=document.getElementsByName("energy"),addEnergy=0,reduceEnergy=0,speed=0;
            powers=Array.prototype.slice.call(powers);
            energys=Array.prototype.slice.call(energys);
            powers.map(function (data) {
                if(data.checked===true){
                    speed=data.value.slice(6,8);
                    reduceEnergy=data.value.slice(15,16);
                }
            })
            energys.map(function (data) {
                if(data.checked==true){
                    addEnergy=data.value.slice(10,11);
                }
            })
            if(addEnergy===0||reduceEnergy===0||speed===0){
                alert("请选择动力系统和能源系统！")
            }else{
                command.createShip(e.target.parentNode.id.slice(7,8),parseInt(reduceEnergy),parseInt(addEnergy),parseInt(speed));
            }
        }
        if(e.target===buttons1[1]||e.target===buttons2[1]||e.target===buttons3[1]||e.target===buttons4[1]){
            command.beginFly(e.target.parentNode.id.slice(7,8));
        }
        if(e.target===buttons1[2]||e.target===buttons2[2]||e.target===buttons3[2]||e.target===buttons4[2]){
            command.stopFly(e.target.parentNode.id.slice(7,8));
        }
        if(e.target===buttons1[3]||e.target===buttons2[3]||e.target===buttons3[3]||e.target===buttons4[3]){
            command.destroyShip(e.target.parentNode.id.slice(7,8));
        }
    };



