window.onload = function () {
    //開いた時に実行される
    Init();
    Start();
}
const height = 22;
const width = 10;

//各種変数
let nowRotate = 0;
let nowMino = Mino.Z;
let nextMinos =  null;
let holdMino = null;

let field = [[0]];

let minoX = 0;
let minoY = 0;

//操作に関わる関数
let isHolded = false;

// 時間処理
var timer    = null;

var Start = function() {
    Init();
	if (!timer) timer = setInterval(Update, 700);   
}

var Update = function() {
    //接地されているならFieldにミノを転写
    
	if (isHit(minoX, minoY + 1, nowMino,nowRotate,field))
        {
            MinoBakeField(minoX,minoY,nowMino,nowRotate,field);
            ArratLineChack(field);
            reloadMino();
        }
        else
        {
            ++minoY;
        }
    displayTable(minoX,minoY,nowMino,nowRotate,field);
}


var Exit = function() {
	// setIntervalの停止
	clearInterval(timer);
	time = null;

}



// キー処理
document.addEventListener('keypress',
    event => {
        //ボタン処理
        if (event.key === 'q' ) {
            if(holdMino === null && !isHolded)
            {
                console.log("hey");
                holdMino = nowMino;
                reloadMino();
                let hold =document.getElementById('hold');
                hold.innerText = holdMino; 
                isHolded = true;
            }
            if((holdMino != null)&& !isHit(minoX, minoY - 1, nowMino,nowRotate,field)&& !isHolded)
            {
                let bufMino;
                bufMino = nowMino;
                nowMino = holdMino;
                holdMino = bufMino;
                
                minoX = 3;
                minoY = 0;
                let hold =document.getElementById('hold');
                hold.innerText = holdMino; 
                isHolded = true;
            }
        }
        if (event.key === 'a' ) {
            if (!isHit(minoX - 1, minoY, nowMino,nowRotate,field))
                {
                    minoX--;
                }
         }
         if (event.key === 's' ) {
            if (!isHit(minoX, minoY + 1, nowMino,nowRotate,field))
                {
                    minoY++;
                }
         }
         if (event.key === 'd' ) {
            if (!isHit(minoX + 1, minoY, nowMino,nowRotate,field))
                {
                    minoX++;
                }
         }
         if (event.key === 'w' ) {
            if (!isHit(minoX, minoY, nowMino,nowRotate + 1,field))
                {
                    nowRotate++;
                    if(nowRotate > 4) nowRotate = nowRotate % 4;
                }
         }
            displayTable(minoX,minoY,nowMino,nowRotate,field);
    });

function Init() {

    //配列の延長
    for (let i = 0; i < height; i++)
    {
        field[i] = [0];
        for (let j = 0; j < width; j++)
        {
            field[i][j] = 0;
        }
    }
    //nextMino用意
    nextMinos = [1,2,3,4,5,6,7]
    for(i = 6; i > 0; i--)
    {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = nextMinos[i];
        nextMinos[i] = nextMinos[j];
        nextMinos[j] = tmp;
    }
    let nextNotice =document.getElementById('next'); 
    nextNotice.innerText = nextMinos.slice(0,7);

    //最初のミノのみ代入
    nowMino = Math.floor( Math.random() * 6 ) + 1;
}

function reloadMino()
    {
        console.log(nextMinos.length);
        if(nextMinos.length < 7){
            let bufArray = [0];
            bufArray = [1,2,3,4,5,6,7]
            for(i = 6; i > 0; i--)
            {
                var j = Math.floor(Math.random() * (i + 1));
                var tmp = bufArray[i];
                bufArray[i] = bufArray[j];
                bufArray[j] = tmp;
            }
            nextMinos = nextMinos.concat(bufArray);
        }
        //新たなミノを補充
        if(isHit(3,0,nextMinos[0],0,field)){
            let notice =document.getElementById('notice'); 
            notice.innerText = 'GameOver!';
            Exit();
        }
        minoX = 3;
        minoY = 0;
        nowRotate = 0;
        nowMino = nextMinos[0]
        nextMinos.shift();
        let nextNotice =document.getElementById('next'); 
        nextNotice.innerText = nextMinos.slice(0,7);
        isHolded = false;
    }
