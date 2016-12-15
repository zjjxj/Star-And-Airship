(function (global) {
    /**
     * 指令类型转换器
     * @param param
     * @returns {*}
     * @constructor
     */
    function Adapter(param) {
        var num=0;
        var str="";
        if(typeof arguments[0]==="string"){
            num=parseInt(param.slice(0,4),2).toString();
            switch (param.slice(4)){
                case "0001":
                    return {id:num,command:"fly"};
                case "0010":
                    return {id:num,command:"stop"};
                case "0011":
                    return {id:num,command:"destroy"};
            }

        }else{
            num=parseInt(param.id);
            var number={"1":"0001","2":"0010","3":"0011","4":"0100"};
            switch (param.command){
                case "fly":
                    str=number[num]+"0001";
                    break;
                case "stop":
                    str= number[num]+"0010";
                    break;
                case "destroy":
                    str= number[num]+"0011";
                    break;
            }
            return str;
        }
    };
    global.Adapter=Adapter;
}(this));
