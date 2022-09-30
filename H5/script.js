var canvas = document.getElementById('canvas');
var startFlag = false;
var currentTime;
var startTime;

if (canvas.getContext){
    // 初始化
    var arr=[];
    for (i=0;i<5;i++){
        arr[i]=getRandom();
    } 
    var ctx = canvas.getContext('2d');
    // 加载图片
    var piBoss = new Image();
    var piBoss_dark = new Image();
    function init(){
        piBoss.src='./piBoss.jpg';
        piBoss_dark.src='./piBoss_dark.jpg';
        window.requestAnimationFrame(draw);
    }

    function draw(){
        var ctx = document.getElementById('canvas').getContext('2d');
        // 在已有的内容的后面,画
        ctx.globalCompositeOperation = 'destination-over';
        // 清空画布
        ctx.clearRect(0, 0, 400, 600);
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeRect(0,0,400,600);
        ctx.closePath();
        ctx.lineWidth = 2;
        // {可以改画曲线}
        for (var i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.moveTo(100 * i, 0);
            ctx.lineTo(100 * i, 600);
            ctx.stroke();
            ctx.closePath();
        }
        for (var i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(0, 120 * i);
            ctx.lineTo(400, 120 * i);
            ctx.stroke();
            ctx.closePath();
        }
        // ctx.save();
        for (var i = 0; i < 5; i++) {
            var x = arr[i] * 100;
            var y = 600 - (i+1) * 120;
            ctx.drawImage(piBoss, x + 2, y + 2, 96, 116);
            arr[i - 1] = arr[i]
        }
        arr[4]=getRandom();
        // ctx.restore();
        // 不注释下面的语句有鬼畜效果
        // window.requestAnimationFrame(draw);
    }
    function getRandom() {
        // 向下取整
        // [0,1)
        return Math.floor(Math.random() * 4);
    }
    
    // 返回true就继续
    function handleKey(e){
        var key_position=-1;
        var keyNum,keyChar;
        // 不好显示表达的字符用num
        // 下面这一句是从stack overflow上看的,应该是为了浏览器的适配
        keyNum = e.which || e.keyCode || 0;
        keyChar = String.fromCharCode(keyNum);
        if(keyNum === 32){
            // 阻止页面下移?
            e.preventDefault();
            startFlag = true;
            currentTime=Date.now();
            console.log(currentTime-startTime);
            startTime=Date.now();
            // console.log(startTime);
        }
        else if(startFlag===true){
            if(keyChar==='s' || keyChar==='S')  key_position=0;
            else if (keyChar==='d' || keyChar==='D')    key_position=1;
            else if (keyChar==='j' || keyChar==='J')    key_position=2;
            else if (keyChar==='k' || keyChar==='K')    key_position=3;

            if(arr[0]===key_position){
                window.requestAnimationFrame(draw);
            }
            else{
                startFlag=false;
                alert('Game Over!');
            }
        }
    }
    function addEvent(){
        document.addEventListener("keydown", handleKey);
    }
    init();
    addEvent();
}
