
// ケーキを探せ！
enchant();

// グローバル変数
var game = null;

window.onload = function(){
    game = new Game(320,320);
    game.preload('images/cake.png', 'images/cakeBack.png', 'images/cakeBack2.png', 'images/cakeBack3.png', 'images/effect0.gif',
                 'images/cakeTitle.png', 'images/cakeTitleBack.png', 'images/startButton.png');
    game.fps = 30;
    game.time = 0;
    game.timer = 0;
    game.flag = true;
    game.onload = function(){
        // ゲームの処理
        // TitleScene
        TitleScene = new Scene();
        // TitleBack
        TitleBack = new Sprite(320, 320);
        TitleBack.image = game.assets['images/cakeTitleBack.png'];
        TitleScene.addChild(TitleBack);
        // Title
        Title = new Sprite(270, 80);
        Title.image = game.assets['images/cakeTitle.png'];
        Title.x = 20;
        TitleScene.addChild(Title);
        // StartButton
        startButton = new Sprite(270, 80);
        startButton.image = game.assets['images/startButton.png'];
        startButton.moveTo(20, 200);
        TitleScene.addChild(startButton);
        startButton.tl.fadeOut(30).fadeIn(30).loop();
        startButton.ontouchstart = function(){
            game.popScene();
            game.pushScene(PlayScene);
        };
        // PlayScene
        PlayScene = new Scene();
        // 背景
        BackGround = new Sprite(320, 320);
        BackGround.key = 0;
        // BackGround.image = game.assets['images/cakeBack.png'];
        PlayScene.addChild(BackGround);

        // ケーキ
        cake = new Sprite(50, 50);
        cake.image = game.assets['images/cake.png'];
        cake.flag = false;
        // ケーキをタッチすると…
        cake.ontouchstart = function(){
        	// 爆発！
        	var explosion = new Explosion(cake.x + 16, cake.y + 16);
        	// そして消える
        	PlayScene.removeChild(cake);
            cake.flag = true;
            game.flag = false;
        };
        PlayScene.onenterframe = function(){
            if(game.flag) if(game.frame % game.fps === 0) game.timer++;
            // cakeがtrueならば
            if(cake.flag){
                if(game.fps % 30 === 0){ // game.fpsを30で割った余りが０ならば
                    game.time++;
                    if(game.time >= 90){ // game.timeが90を越えたら
                        game.popScene();
                        game.pushScene(EndScene);
                    }
                }
            }
        };
        // 初期化処理
        PlayScene.onenter = function(){
            BackGround.key = randfunc(1, 4); // 1~3
            switch(BackGround.key){
                case 1:
                    BackGround.image = game.assets['images/cakeBack.png'];
                break;
                case 2:
                    BackGround.image = game.assets['images/cakeBack2.png'];
                break;
                case 3:
                    BackGround.image = game.assets['images/cakeBack3.png'];
                break;
            }
            game.time = 0;
            game.timer = 0;
            game.flag = true;
            cake.flag = false;
            cake.moveTo(randfloot(0, 320 - 50), randfloot(0, 320 - 50));
            PlayScene.addChild(cake);
        }
        // End
        EndScene = new Scene();
        EndScene.backgroundColor = "black";
        // EndAnimation
        EndScene.onenter = function(){
            EndScene.tl.cue({
                30: function(){
                    // 
                    label_1 = new Label();
                    label_1.moveTo(70, 100);
                    label_1.text = "あなたは　けーきを　みつけ";
                    label_1.color = "red";
                    EndScene.addChild(label_1);
                },
                60: function(){
                    // 
                    label_2 = new Label();
                    label_2.moveTo(50, 125);
                    label_2.text = "";
                    label_2.color = "red";
                    EndScene.addChild(label_2);
                    label_2.onenterframe = function(){
                        label_2.text = game.timer + "びょう　で　ばくはつさせました！";
                    }
                },
                90: function(){
                    label_3 = new Label();
                    label_3.moveTo(120, 150);
                    label_3.text = "You Win !!";
                    label_3.color = "red";
                    EndScene.addChild(label_3);
                },
                120: function(){
                    replay = new Label();
                    replay.moveTo(110, 240);
                    replay.text = "もういっかい？";
                    replay.color = "red";
                    EndScene.addChild(replay);
                    replay.ontouchstart = function(){
                        game.popScene();
                        game.pushScene(TitleScene);
                    };
                }
            });
        };
        EndScene.onexit = function(){
            // 消去処理
            EndScene.tl.clear();
            EndScene.removeChild(label_1);
            EndScene.removeChild(label_2);
            EndScene.removeChild(label_3);
            EndScene.removeChild(replay);
        };
        game.pushScene(TitleScene);
    };
    game.start();
}


// =====================================================
//ランダム値生成(少数含む)
var randfloot = function(min, max) {
    return Math.random()*(max-min)+min;
};
// 乱数の生成
function randfunc(min, max){ // min ~ max - 1の乱数発生　例：１〜２の乱数ならば引数に1,3を渡す
    return Math.floor(Math.random() * (max - min) + min);
}
// 爆発クラス
var Explosion = Class.create(Sprite, {
    // 初期化関数
    initialize: function(x, y){
        Sprite.call(this, 16, 16);
        this.x = x;
        this.y = y;
        // gameオブジェクトをグローバル変数にする事で
        // クラス内でもgameオブジェクトが使用出来る
        this.image = game.assets['images/effect0.gif'];
        this.time = 0;
        // アニメーションの遅れ
        this.duration = 20;
        this.frame = 0;
        
        this.addEventListener('enterframe', function(){
            this.time++;
            // 爆発アニメーション
            this.frame = Math.floor(this.time / this.duration * 5);
            // 徐々に大きく
            if(game.fps % 30 === 0){
                this.scale(1.05, 1.05);
            }
            // Timeが２０になったら消去
            if(this.time == this.duration)
                this.remove();
        });
        PlayScene.addChild(this);
    }, 
    // 消去関数
    remove: function(){
        PlayScene.removeChild(this);
    }
});
