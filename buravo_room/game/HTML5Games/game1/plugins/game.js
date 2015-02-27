enchant();

// 乱数の生成
function rand(min, max){ // first ~ lastの乱数
    return Math.floor(Math.random() * (max - min) + min);
}

window.onload = function(){
    // Gameオブジェクトの生成 new Game(画面の横幅, 画面の縦幅);
    game = new Game(320, 320);
    game.fps = 30;
    // gameオブジェクトが持つプロパティ名:time
    game.time = 0;
    // 画像の読み込み
    game.preload(
        		'data/chara1.gif',
				'data/icon0.gif'
    );
    game.onload = function(){
        // Sceneの生成
        GameScene = new Scene();
        // GameSceneの背景色:black
        GameScene.backgroundColor = "black";
        
        // ScoreLabel
        var scoreLabel = new ScoreLabel(10, 60);
        scoreLabel.moveTo(10, 10);
        scoreLabel.score = 0;
        GameScene.addChild(scoreLabel);
        
        var timeLabel = new TimeLabel(10, 50, "countdown");
        timeLabel.time = 60;
        GameScene.addChild(timeLabel);
        
        // GameSceneがワンフレーム毎に処理する
        GameScene.addEventListener('enterframe', function(){
            if(timeLabel.time < 0){
                game.end();
            }
            game.time++;
            // game.timeを30で割って余りが0なら処理
            if(game.time % 30 === 0){
                // Sprite生成
                var bear = new Sprite(32, 32);
                // 画像の設定
                bear.image = game.assets['data/chara1.gif'];
                // フレーム番号0を表示
                bear.frame = 0;
                // 座標をランダムにする。1 ~ 320-32
                bear.x = rand(1, 320 - 32);
                bear.y = rand(1, 320 - 32);
                // 速度
                bear.speedX = 2;
                bear.speedY = 2;
                // bearが持つ時間
                bear.time = 0;
                // bearが持つカウント
                bear.count = 0;
                // GameSceneにbearを追加する
                GameScene.addChild(bear);
                // Bar生成
                var lifebar = new Bar(bear.x, bear.y - 10);
                // ライフバーの色の設定
                lifebar.image.context.fillStyle = 'rgb(250, 0, 0)';		// 書き換えることも可能
                // ライフバーの大きさの設定
                lifebar.image.context.fillRect(0, 0, 1, 5);				// 書き換えることも可能
                // ライフバーの座標
                lifebar.moveTo(bear.x, bear.y - 10);
                // ライフバーの最初のHP
                lifebar.value = 30;
                // ライフバーの最大HP
                lifebar.maxvalue = 30;
                // GameSceneにlifebarを追加する
                GameScene.addChild(lifebar);
                
                // bearがワンフレーム毎に処理する
                bear.addEventListener('enterframe', function(){
                    lifebar.moveTo(bear.x, bear.y - 10);
                    // game.timeを30で割って余りが0なら処理
                    if(game.fps % 30 === 0){
                        // bearが持つ時間が１増加
                        bear.time++;
                    }
                    // bearが持つ時間が90より大きくなる又は同じになれば処理
                    if(bear.time >= 90){
                        bear.x += bear.speedX;
                        bear.frame++;
                        bear.frame %= 3;
                    }
                    if(bear.x <= 0 - 32){
                        GameScene.removeChild(bear);
                        GameScene.removeChild(lifebar);
                    }
                    if(bear.x >= 320 + 32){
                        GameScene.removeChild(bear);
                        GameScene.removeChild(lifebar);
                    }
                });
                // markがタッチされたら処理
                bear.addEventListener('touchstart', function(){
                    // ライフが１０減少
                    lifebar.value -= 10;
                    // ライフが０になれば処理
                    if(lifebar.value <= 0){
                        // Score++
                        scoreLabel.score += 100;
                        // bearがワンフレーム毎に処理
                    	bear.addEventListener('enterframe', function(){
                           // フレーム番号を３にする（泣いているクマになる）
                           bear.frame = 3;
                           // game.timeを30で割って余りが0なら処理
                     	   if(game.fps % 30 === 0){
                               // クマが少しずつ上に進む
                     	       bear.y--;
                               // クマが少しずつ小さくなる
                     	       bear.scale(0.9, 0.9);
                               // クマが５ずつ回転する
                     	       bear.rotation += 5;
                               // カウントする
                      	       bear.count++;
                      	  }
                          // カウントが３０より大きくなる又は同じになれば処理
                      	  if(bear.count >= 30){
                             // GameSceneから消去
                       	     GameScene.removeChild(bear);
                             GameScene.removeChild(lifebar);
                       	 }
                		});
                    }
                });
                
            }
        });
        // gameオブジェクトにGameSceneをpushする
        game.pushScene(GameScene);
    };
    // gameStart
    game.start();
};
