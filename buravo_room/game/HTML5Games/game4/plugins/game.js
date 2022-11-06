
enchant();

// グローバル化
var game = null;
var TitleScene = null;
var PlayScene = null;
var EndScene = null;
var objs = [];
var objsum = 0;
var timeLabel = null;
var scoreLabel = null;

window.onload = function(){
    game = new Game(320,320);
    game.fps = 30;
    game.preload('images/TitleButton2.png','images/tweetButton2.png','images/fukidasi.png',
                 'images/fukidasi2.png','images/title.png','images/rabbit.png','images/gaia2.png',
                 'images/moon3.png','images/AttackButton2.png','images/notAttackButton2.png',
                 'images/PlayButton2.png', 'images/effect0.png', 'images/hummer.png');
                 // 'images/se_maoudamashii_system37.wav','images/se_maoudamashii_battle12.wav');
    game.onload = function(){
        // ゲームの処理
        // ===============================================================================
        // TitleScene
        TitleScene = new Scene();
        TitleScene.backgroundColor = 'black';
        // Animation
        var hummerAnimation = new Sprite(245, 140);
        hummerAnimation.image = game.assets['images/hummer.png'];
        hummerAnimation.moveTo(120, 80);
        hummerAnimation.rotation = 90;
        TitleScene.addChild(hummerAnimation);
        // Title
        var Title = new Sprite(200, 120);
        Title.image = game.assets['images/title.png'];
        Title.moveTo(50, 0);
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
            })
        }
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
        // シーン開始
        PlayScene.onenter = function(){
            // Init
            scoreLabel.score = 0;
            scoreLabel.moveTo(10, 40);
            PlayScene.addChild(scoreLabel);
            timeLabel.time = 40;
            objsum = 0;
            for(var i in objs){
                objs[i].remove();
            }
            objs = [];
            // Create
            CreateObj(randfunc(1,4));
        }
        // ハンマー
        var hummer = new Sprite(245, 140);
        hummer.image = game.assets['images/hummer.png'];
        hummer.moveTo(80, 40);
        hummer.animationFlag = 0;
        PlayScene.addChild(hummer);
        // たたくボタン
        var AttackButton = new Sprite(130, 45);
        AttackButton.image = game.assets['images/AttackButton2.png'];
        AttackButton.frame = 0;
        AttackButton.animationFlag = 0;
        AttackButton.moveTo(20, 270);
        PlayScene.addChild(AttackButton);
        // タッチしたら
        AttackButton.ontouchstart = function(){
            AttackButton.frame = 1;
        }
        // タッチして指を離したら
        AttackButton.ontouchend = function(){
            AttackButton.frame = 0;
            if(hummer.animationFlag === 0){
                hummer.animationFlag = 1;
                hummer.tl.rotateTo(60, 10).rotateTo(-30, 10).then(function(){
                    // game.assets['images/se_maoudamashii_battle12.wav'].play();
                    // 月ならば
                    if(objs[objsum].flag === 0){
                        // 消去
                        objs[objsum].remove();
                        scoreLabel.score += 1000;
                        var explosion = new Explosion(objs[objsum].x + 35, objs[objsum].y + 55);
                    }
                    // 地球ならば
                    if(objs[objsum].flag === 1){
                        // 消去
                        objs[objsum].remove();
                        scoreLabel.score -= 2000;
                        var balloon = new SpeechBalloon(objs[objsum].x, objs[objsum].y, 1);
                    }
                    // うさぎならば
                    if(objs[objsum].flag === 2){
                        // 消去
                        objs[objsum].remove();
                        timeLabel.time += 2;
                        var balloon = new SpeechBalloon(objs[objsum].x, objs[objsum].y, 0);
                    }
                    // 個数追加
                    objsum++;
                    // obj生成
                    CreateObj(randfunc(1,4));
                    hummer.animationFlag = 0;
                });
            }
        }
        // たたかないボタン
        var notAttackButton = new Sprite(130, 45);
        notAttackButton.image = game.assets['images/notAttackButton2.png'];
        notAttackButton.frame = 0;
        notAttackButton.animationFlag = 0;
        notAttackButton.moveTo(170, 270);
        PlayScene.addChild(notAttackButton);
        // タッチしたら
        notAttackButton.ontouchstart = function(){
            notAttackButton.frame = 1;
        }
        // タッチして指を離したら
        notAttackButton.ontouchend = function(){
            notAttackButton.frame = 0;
            if(hummer.animationFlag === 0){
                hummer.animationFlag = 1;
                // objが横に逸れるようにする
                objs[objsum].straight(1);
                objs[objsum].onenterframe = function(){
                    if(objs[objsum].x >= 320){
                        // 個数追加
                        objsum++;
                        // obj生成
                        CreateObj(randfunc(1,4));
                        hummer.animationFlag = 0;
                    }
                }
            }
        }
        // 毎フレーム毎
        PlayScene.onenterframe = function(){
            if(timeLabel.time <= 0.00){
                game.popScene();
                game.pushScene(EndScene);
            }
        }
        // シーン終了
        PlayScene.onexit = function(){
            PlayScene.removeChild(scoreLabel);
        }
        // ===============================================================================
        // EndScene
        EndScene = new Scene();
        EndScene.backgroundColor = 'black';
        // シーン開始
        EndScene.onenter = function(){
            scoreLabel.moveTo(75, 100);
            EndScene.addChild(scoreLabel);
        }
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
            })
        }
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
                var message = "あなたのSCOREは " + scoreLabel.score + " です！\nhttp://buravo46.web.fc2.com/game/game4/index.html\n#ahoge";
                // Twitter に移動
                location.href = twitter_url+ EUC(message);
            })
        }
        // ===============================================================================
        game.pushScene(TitleScene);
    };
    game.start();
}
// ===============================================================================
// 乱数の生成
function randfunc(min, max){ // min ~ max - 1の乱数発生　例：１〜２の乱数ならば引数に1,3を渡す
    return Math.floor(Math.random() * (max - min) + min);
}
// オブジェクト生成
var CreateObj = function(number){
    switch(number){
        case 1:
        var moon = new Moon(-110, 160);
        moon.tl.moveTo(75, 160, 20);
        objs.push(moon);
        break;
        case 2:
        var gaia = new Gaia(-110, 160);
        gaia.tl.moveTo(75, 160, 20);
        objs.push(gaia);
        break;
        case 3:
        var rabbit = new Rabbit(-110, 160);
        rabbit.tl.moveTo(75, 160, 20);
        objs.push(rabbit);
        break;
    }
}
// ===============================================================================
// 月
var Moon = Class.create(Sprite,{
    initialize:function(posX, posY){
        //
        Sprite.call(this, 100, 100);
        this.image = game.assets['images/moon3.png'];
        this.x = posX;
        this.y = posY;
        this.flag = 0;
        PlayScene.addChild(this);
    },
    onenterframe: function(){
        // 
        if(this.x >= 320) this.remove();
        this.straight();
    },
    straight: function(flag){
        if(flag === 1){
            this.tl.moveBy(300, 0, 20);
        }
    },
    // 消去
    remove: function(){
        PlayScene.removeChild(this);
        delete this;
    }
});

// 地球
var Gaia = Class.create(Sprite,{
    initialize:function(posX, posY){
        //
        Sprite.call(this, 100, 100);
        this.image = game.assets['images/gaia2.png'];
        this.x = posX;
        this.y = posY;
        this.flag = 1;
        PlayScene.addChild(this);
    },
    onenterframe: function(){
        // 
        if(this.x >= 320) this.remove();
        this.straight();
    },
    straight: function(flag){
        if(flag === 1){
            this.tl.moveBy(300, 0, 20);
        }
    },
    // 消去
    remove: function(){
        PlayScene.removeChild(this);
        delete this;
    }
});

// うさぎ
var Rabbit = Class.create(Sprite,{
    initialize:function(posX, posY){
        //
        Sprite.call(this, 100, 100);
        this.image = game.assets['images/rabbit.png'];
        this.x = posX;
        this.y = posY;
        this.flag = 2;
        PlayScene.addChild(this);
    },
    onenterframe: function(){
        // 
        if(this.x >= 320) this.remove();
        this.straight();
    },
    straight: function(flag){
        if(flag === 1){
            this.tl.moveBy(300, 0, 20);
        }
    },
    // 消去
    remove: function(){
        PlayScene.removeChild(this);
        delete this;
    }
});

// 爆発
var Explosion = Class.create(Sprite, {
    // 初期化関数
    initialize: function(x, y){
        Sprite.call(this, 16, 16);
        this.x = x;
        this.y = y;
        // gameオブジェクトをグローバル変数にする事で
        // クラス内でもgameオブジェクトが使用出来る
        this.image = game.assets['images/effect0.png'];
        this.time = 0;
        // アニメーションの遅れ
        this.duration = 20;
        this.frame = 0;
        this.scale(5.0, 5.0);
        this.addEventListener('enterframe', function(){
            this.time++;
            // 爆発アニメーション
            this.frame = Math.floor(this.time / this.duration * 5);
            // 徐々に大きく
            if(game.fps % 30 == 0){
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
        delete this;
    }
});

// 吹き出し
var SpeechBalloon = Class.create(Sprite, {
    // 初期化関数
    initialize: function(x, y, id){
        Sprite.call(this, 120, 120);
        this.x = x;
        this.y = y;
        switch(id){
            case 0:
            this.image = game.assets['images/fukidasi.png'];
            break;
            case 1:
            this.image = game.assets['images/fukidasi2.png'];
            break;
        }
        this.frame = 0;
        this.addEventListener('enterframe', function(){
            // 徐々に消える
            if(game.fps % 30 == 0){
                this.opacity -= 0.05;
            }
            // 透明度が０になれば
            if(this.opacity <= 0)
                this.remove();
        });
        PlayScene.addChild(this);
    }, 
    // 消去関数
    remove: function(){
        PlayScene.removeChild(this);
        delete this;
    }
});
// ===============================================================================