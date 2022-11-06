
enchant();

var blocks = [];
var shots = [];
window.onload = function(){
    var game = new Game(320,320);
    game.preload(	'images/numShot.png', 'images/block.png', 'images/PlayButton2.png',
					'images/TitleButton2.png','images/tweetButton2.png','images/titleName.png');
                    // 'images/se_maoudamashii_system37.wav','images/se_maoudamashii_battle12.wav');
    game.onload = function(){
        // ゲームの処理
        // TitleScene
        TitleScene = new Scene();
        TitleScene.backgroundColor = 'black';
        // Title
        var Title = new Sprite(320, 180);
        Title.image = game.assets['images/titleName.png'];
        Title.moveTo(0, 0);
        TitleScene.addChild(Title);
        // PlayButton
        var PlayButton = new Sprite(130, 45);
        PlayButton.image = game.assets['images/PlayButton2.png'];
        PlayButton.frame = 0;
        PlayButton.moveTo(game.width/2-PlayButton.width/2, 230);
        TitleScene.addChild(PlayButton);
        // ボタンをタッチしたら
        PlayButton.ontouchstart = function(){
            // タッチしたと感じるボタンにする
            PlayButton.frame = 1;
        };
        // ボタンを離したら
        PlayButton.ontouchend = function(){
            // ボタンを元に戻す
            PlayButton.frame = 0;
            // se
            // game.assets['images/se_maoudamashii_system37.wav'].play();
            // 10フレーム待って、TitleSceneを外してPlaySceneを付ける
            TitleScene.tl.delay(10).then(function(){
                game.popScene();
                game.pushScene(PlayScene);
            });
        };
        // ===============================================================================
        // PlayScene
        PlayScene = new Scene();
        PlayScene.backgroundColor = 'black';
        // Time
        timeLabel = new TimeLabel(10, 10, 'countdown');
        timeLabel.time = 40;
        PlayScene.addChild(timeLabel);
        // Score
        scoreLabel = new ScoreLabel(10, 40);
        scoreLabel.score = 0;
        // Button
        var shotButton = new Sprite(32, 32);
        shotButton.image = game.assets['images/numShot.png'];
        shotButton.frame = 0;
        shotButton.touchFlag = false;
        shotButton.moveTo(game.width/2-shotButton.width/2, 280);
        shotButton.scale(1.5, 1.5);
        shotButton.ontouchstart = function(){
            shotButton.frame++;
            shotButton.touchFlag = true;
            if(shotButton.frame >= 10){
                shotButton.frame = 0;
            }
        };
        shotButton.ontouchend = function(){
            shotButton.touchFlag = false;
        };
        PlayScene.addChild(shotButton);
        // シーン開始
        PlayScene.onenter = function(){
            // Init
            scoreLabel.score = 0;
            scoreLabel.moveTo(10, 40);
            PlayScene.addChild(scoreLabel);
            timeLabel.time = 60;
            shotButton.frame = 0;
            shotButton.touchFlag = false;
            for(var i in shots){
                    PlayScene.removeChild(shots[i]);
                    delete shots[i];
            }
            for(var i in blocks){
                    PlayScene.removeChild(blocks[i]);
                    delete blocks[i];
            }
        };
        // 毎フレーム毎
        PlayScene.onenterframe = function(){
            PlayScene.removeChild(shotButton);
            PlayScene.addChild(shotButton);
            if(game.frame % game.fps === 0){
                var block = new Block(40, 65, randfunc(0, 9));
                blocks.push(block);
            }
            if(timeLabel.time <= 0.00){
                game.popScene();
                game.pushScene(EndScene);
            }
            // 
            PlayScene.ontouchstart = function(e){
                if(!shotButton.touchFlag){
                    var shot = new Shot(shotButton.x, shotButton.y, shotButton.frame);
                    // atan2(目標方向のy座標 - 初期位置のy座標, 目標方向のx座標 - 初期位置のx座標)
                    // これでラジアンが出る。
                    // このラジアンを使い、特定の方向へ進むことが出来る。
                    shot.rad = Math.atan2(e.y - shot.y, e.x - shot.x);
                    shots.push(shot);
                }
            };
        };
        // シーン終了
        PlayScene.onexit = function(){
            PlayScene.removeChild(scoreLabel);
        };
        // ===============================================================================
        // EndScene
        EndScene = new Scene();
        EndScene.backgroundColor = 'black';
        // シーン開始
        EndScene.onenter = function(){
            scoreLabel.moveTo(100, 100);
            EndScene.addChild(scoreLabel);
        };
        var TitleButton = new Sprite(130, 45);
        TitleButton.image = game.assets['images/TitleButton2.png'];
        TitleButton.frame = 0;
        TitleButton.moveTo(game.width/2-TitleButton.width/2, 180);
        EndScene.addChild(TitleButton);
        // ボタンをタッチしたら
        TitleButton.ontouchstart = function(){
            // タッチしたと感じるボタンにする
            TitleButton.frame = 1;
        };
        // ボタンを離したら
        TitleButton.ontouchend = function(){
            // ボタンを元に戻す
            TitleButton.frame = 0;
            // game.assets['images/se_maoudamashii_system37.wav'].play();
            // 10フレーム待って、EndSceneを外してTitleSceneを付ける
            EndScene.tl.delay(10).then(function(){
                game.popScene();
                game.pushScene(TitleScene);
            });
        };
        var TweetButton = new Sprite(130, 45);
        TweetButton.image = game.assets['images/tweetButton2.png'];
        TweetButton.frame = 0;
        TweetButton.moveTo(game.width/2-TweetButton.width/2, 230);
        EndScene.addChild(TweetButton);
        // ボタンをタッチしたら
        TweetButton.ontouchstart = function(){
            // タッチしたと感じるボタンにする
            TweetButton.frame = 1;
        };
        // ボタンを離したら
        TweetButton.ontouchend = function(){
            // ボタンを元に戻す
            TweetButton.frame = 0;
            // game.assets['images/se_maoudamashii_system37.wav'].play();
            // 10フレーム待つ
            EndScene.tl.delay(10).then(function(){
                var EUC = encodeURIComponent;
                var twitter_url = "http://twitter.com/?status=";
                var message = "あなたのSCOREは " + scoreLabel.score + " です！\nhttp://buravo46.web.fc2.com/game/game5/index.html\n#ahoge";
                // Twitter に移動
                location.href = twitter_url+ EUC(message);
            });
        };
        // ===============================================================================
        game.pushScene(TitleScene);
    };
    game.start();
};

// ===============================================================================
// 乱数の生成
function randfunc(min, max){ // min ~ max - 1の乱数発生　例：１〜２の乱数ならば引数に1,3を渡す
    return Math.floor(Math.random() * (max - min) + min);
}
// ===============================================================================
// 
var Shot = Class.create(Sprite,{
    initialize:function(posX, posY, flag){
        //
        var game = enchant.Game.instance;
        Sprite.call(this, 32, 32);
        this.image = game.assets['images/numShot.png'];
        this.x = posX;
        this.y = posY;
        // 角度
        this.rad = 0;
        this.speedX = 5;
        this.frame = flag;
        this.answerFlag = flag;
        PlayScene.addChild(this);
    },
    onenterframe: function(){
        // x += SPEED * cos(ラジアン), y += SPEED * sin(ラジアン)
        // これで特定の方向へ向かって進んでいく。
        this.x += 3 * Math.cos(this.rad);
        this.y += 3 * Math.sin(this.rad);
        if(this.x <= 0-64 || this.x >= 320+64 || this.y <= 0 || this.y >= 320+64){
            PlayScene.removeChild(this);
        }
        for(var i in blocks){
            if(this.intersect(blocks[i])){
                if(this.answerFlag === blocks[i].answerFlag){
                    var game = enchant.Game.instance;
                    // game.assets['images/se_maoudamashii_battle12.wav'].play();
                    scoreLabel.score += 100;
                    this.x = 1000;
                    blocks[i].y = 1000;
                    PlayScene.removeChild(this);
                    delete this;
                    PlayScene.removeChild(blocks[i]);
                    delete blocks[i];
                }
            }
        }
    },
    // 消去
    remove: function(){
        PlayScene.removeChild(this);
        delete this;
    }
});

var Block = Class.create(Sprite,{
    initialize:function(posX, posY, flag){
        //
        var game = enchant.Game.instance;
        Sprite.call(this, 64, 32);
        this.image = game.assets['images/block.png'];
        this.x = posX;
        this.y = posY;
        this.speedX = 3;
        this.frame = flag;
        this.answerFlag = flag;
        PlayScene.addChild(this);
    },
    onenterframe: function(){
        this.x += this.speedX;
        if(this.x <= 0 || this.x >= 320-64){
            this.speedX*=-1;
            this.tl.moveBy(0, 32, 5);
        }
        if(this.y <= 0 || this.y >= 320+64){
            PlayScene.removeChild(this);
            delete this;
        }

    },
    // 消去
    remove: function(){
        PlayScene.removeChild(this);
        delete this;
    }
});