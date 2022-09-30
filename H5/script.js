var canvas = document.getElementById('canvas');
var startFlag = false;
var currentTime;
var startTime;
var score=0;
var scoreNode = document.getElementById('score');
var timeNode = document.getElementById('time');

if (canvas.getContext){
    // 初始化
    var arr=[];
    var arr_old=[];
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
        ctx.save();
        for (var i = 0; i < 5; i++) {
            var x = arr[i] * 100;
            var y = 600 - (i+1) * 120;
            if(i===0){
                ctx.drawImage(piBoss, x + 2, y + 2, 96, 116);
            }
            else{
                ctx.drawImage(piBoss_dark, x + 2, y + 2, 96, 116);
            }
            arr_old[i]=arr[i];
            if(i!==0){
                arr[i - 1] = arr[i];
            }
        }
        arr[4]=getRandom();
        ctx.restore();
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
        if(keyNum === 32&&startFlag===false){
            console.log('空格输入');
            // 阻止页面下移?
            e.preventDefault();
            startFlag = true;
            startTime=Date.now();
            window.requestAnimationFrame(drawTime);
        }
        else if(startFlag===true){
            if(keyChar==='s' || keyChar==='S')  key_position=0;
            else if (keyChar==='d' || keyChar==='D')    key_position=1;
            else if (keyChar==='j' || keyChar==='J')    key_position=2;
            else if (keyChar==='k' || keyChar==='K')    key_position=3;
            else if(keyNum === 32){
                e.preventDefault();
                return;
            }
            else return;
            console.log(key_position);
            if(arr_old[0]===key_position){
                window.requestAnimationFrame(draw);
                score++;
                scoreNode.innerText=score;
            }
            else{
                startFlag=false;
                score=0;
                scoreNode.innerText=score;
                alert('Game Over!按空格重新开始游戏~');
                timeNode.innerText='0.00';
            }
        }
        else{
            alert('你干嘛~是不是还没按空格开始呀!');
        }
    }
    function addEvent(){
        document.addEventListener("keydown", handleKey);
    }
    function drawTime(){
        currentTime=Date.now();
        var elapsedTime = ((currentTime-startTime)/1000).toFixed(2);
        timeNode.innerText=elapsedTime;
        if(startFlag){
            window.requestAnimationFrame(drawTime);
        }
    }
    init();
    addEvent();
}
