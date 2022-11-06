
enchant();

// グローバル
var game = null;
var TitleScene = null;
var PlayScene = null;
var EndScene = null;
var player = null;
var shot = null;
var shotGauge = null;
var target = null;
var targets = [];
var scoreLabel = null;
var timeLabel = null;

window.onload = function(){
    game = new Game(320,320);
    game.fps = 30;
    game.score = 0;
    game.preload('images/player.png','images/shot.png',
                 'images/chara1.png', 'images/effect0.png', 'images/icon0.png',
                 'images/title.png','images/button.png');
                 // 'images/se_maoudamashii_system41.wav',
                 // 'images/se_maoudamashii_battle_gun03.wav',
                 // 'images/se_maoudamashii_battle15.wav');
    game.onload = function(){
        // ゲームの処理
        // Title
        TitleScene = new Scene();
        Title = new Sprite(320, 320);
        Title.image = game.assets['images/title.png'];
        TitleScene.addChild(Title);
        TitleButton = new Sprite(100, 50);
        TitleButton.image = game.assets['images/button.png'];
        TitleButton.moveTo(110, 240);
        TitleScene.addChild(TitleButton);
        TitleButton.ontouchstart = function(){
            // game.assets['images/se_maoudamashii_system41.wav'].play();
            game.popScene();
            game.pushScene(PlayScene);
        };
        // PlayScene
        PlayScene = new Scene();
        PlayScene.backgroundColor = "black";
        // 初期化処理
        PlayScene.onenter = function(){
        	// Time
	        timeLabel = new TimeLabel(0, 10, 'countdown');
	        timeLabel.time = 40;
	        PlayScene.addChild(timeLabel);
	        // Score
	        scoreLabel = new ScoreLabel(0, 40);
	        scoreLabel.score = 0;
	        PlayScene.addChild(scoreLabel);
            // Init
            player.moveTo(20, 150);
            shot.moveTo(player.x+32, player.y+16);
            shot.shotFlag = 0;
            shot.number = 0;
            game.score = 0;
        };
        // Player
        player = new Sprite(64,64);
        player.image = game.assets['images/player.png'];
        player.moveTo(20, 150);
        PlayScene.addChild(player);
		var input = game.input;
		var SPEED = 4;
        game.keybind(83,'down');            //Sキーをdownボタンに登録
        game.keybind(87,'up');              //Wキーをupボタンに登録
        player.onenterframe = function(e){
		    if(input.up)    { this.y -= SPEED; }
		    if(input.down)  { this.y += SPEED; }
		    if(player.y >= 320 - 64) player.y = 320 - 64;
		    if(player.y <= 80) player.y = 80;
        }
        //弾
        shot = new Sprite(32, 32);
        shot.image = game.assets['images/shot.png'];
        shot.moveTo(player.x+32, player.y+16);
        shot.dx = 0;
        shot.shotFlag = 0;
        shot.number = 0;
        PlayScene.addChild(shot);
        // 弾発射ゲージ
        shotGauge = new Bar(0, 70);
        shotGauge.image.context.fillStyle = 'rgb(0, 250, 0)';
        shotGauge.image.context.fillRect(0, 0, 1, 16);
        shotGauge.value = 0;
        shotGauge.maxvalue = 100;
        shotGauge.addValue = 10;
        PlayScene.addChild(shotGauge);
        // EnterFrame
        PlayScene.onenterframe = function(e) {
        	scoreLabel.score = game.score;
        	if(timeLabel.time <= 0){
        		game.popScene();
        		game.pushScene(EndScene);
        	}
            if(shot.shotFlag === 0){
            	shot.moveTo(player.x+32, player.y+16);
            }
            if(game.frame % game.fps === 0){
	            // 的生成
	            target = new Target(290, -16);
	            targets.push(target);
	        }
            // 
            if(game.frame % 2 === 0){
            	shotGauge.value += shotGauge.addValue;
            	if(shotGauge.value >= 100){
            		shotGauge.value = 100;
            		shotGauge.addValue *= -1;
            	}
            	if(shotGauge.value <= 0){
            		shotGauge.value = 0;
            		shotGauge.addValue *= -1;
            	}
            }
        };
        // TouchStart
        PlayScene.ontouchstart = function(e){
        	if(shot.shotFlag === 0){
	        	// 割る
	        	shotGauge.value = shotGauge.value / 10;
	        	// 発射ゲージを速度に代入
		        shot.dx = shotGauge.value;
                // SE
                // game.assets['images/se_maoudamashii_battle_gun03.wav'].play();
		        // Init
		        shotGauge.value = 0;
		        shot.shotFlag = 1;
                // ++
                shot.number++;
	        	shot.onenterframe = function(e){
		            // 発射
		            shot.x += shot.dx;
		            if(shot.x >= 320 + 64 || shot.y >= 320 + 64){
		            	shot.shotFlag = 0;
		            }
	        	};
	        }
        };
        // Exit
        PlayScene.onexit = function(){
        	PlayScene.removeChild(timeLabel);
        	PlayScene.removeChild(scoreLabel);
        };
        // End
        EndScene = new Scene();
        EndScene.backgroundColor = "black";
        // EndAnimation
        EndScene.onenter = function(){
            EndScene.tl.cue({
                30: function(){
                    // 
                    label_1 = new Label();
                    label_1.moveTo(50, 100);
                    label_1.text = "あなたは　";
                    label_1.color = "white";
                    EndScene.addChild(label_1);
                },
                60: function(){
                    // 
                    label_2 = new Label();
                    label_2.moveTo(120, 100);
                    label_2.text = "";
                    label_2.color = "white";
                    EndScene.addChild(label_2);
                    label_2.onenterframe = function(){
                        label_2.text = shot.number + "回　発射しました！";
                    }
                },
                90: function(){
                    label_3 = new Label();
                    label_3.moveTo(120, 150);
                    label_3.text = "そして　";
                    label_3.color = "white";
                    EndScene.addChild(label_3);
                },
                120: function(){
                    label_4 = new Label();
                    label_4.moveTo(50, 200);
                    label_4.text = "得点を　";
                    label_4.color = "white";
                    EndScene.addChild(label_4);
                },
                150: function(){
                    // 
                    label_5 = new Label();
                    label_5.moveTo(120, 200);
                    label_5.text = "";
                    label_5.color = "white";
                    EndScene.addChild(label_5);
                    label_5.onenterframe = function(){
                        label_5.text = scoreLabel.score + "点　稼ぎました！";
                    }
                },
                180: function(){
                    replay = new Label();
                    replay.moveTo(110, 270);
                    replay.text = "もういっかい？";
                    replay.color = "white";
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
            EndScene.removeChild(label_4);
            EndScene.removeChild(label_5);
            EndScene.removeChild(replay);
        };
        game.pushScene(TitleScene);
    };
    game.start();
}

var Target = Class.create(Sprite, {
    initialize: function(posX, posY){
        Sprite.call(this, 16, 16);
        this.image = game.assets['images/icon0.png'];
        this.x = posX; // 座標
        this.y = posY; // 座標
        this.dx = 0; // 速度
        this.dy = 2; // 速度
        this.frame = 0;
        this.frameIndex = randfunc(0,11);
        frameList = [10, 14, 15, 16, 17, 18, 27, 28, 29, 30, 31];
        PlayScene.addChild(this);
    },
    onenterframe: function(){
        this.y += this.dy;
        this.stageNotOver();
        this.frame = frameList[this.frameIndex];
        if(shot.within(this, 16)){
        	this.remove();
            // game.assets['images/se_maoudamashii_battle15.wav'].play();
        	switch(this.frame){
        		case 10:
        		game.score += 10;
        		break;
        		case 14:
        		game.score += 30;
        		break;
        		case 15:
        		game.score += 20;
        		break;
        		case 16:
        		game.score += 20;
        		break;
        		case 17:
        		game.score += 20;
        		break;
        		case 18:
        		game.score += 20;
        		break;
        		case 27:
        		game.score += 20;
        		break;
        		case 28:
        		game.score += 20;
        		break;
        		case 29:
        		game.score += 20;
        		break;
        		case 30:
        		game.score += 50;
        		break;
        		case 31:
        		game.score += 100;
        		break;
        	}
        }
    },
    stageNotOver: function(){
        // 画面外処理
        if (this.x < 0 || this.x > 320 - 16) {
        	this.remove();
        }
        if (this.y > 320 - 16) {
            this.remove();
        };
    },
    remove: function(){
        PlayScene.removeChild(this);
        delete this;
    }
});
//ランダム値生成(少数含む)
var randfloot = function(min, max) {
    return Math.random()*(max-min)+min;
};

// 乱数の生成
function randfunc(min, max){ // min ~ max - 1の乱数発生　例：１〜２の乱数ならば引数に1,3を渡す
    return Math.floor(Math.random() * (max - min) + min);
}


