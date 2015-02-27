/**
 * @fileOverview 結果を表示するシーンクラスを記述するファイルです。
 *
 * @author Shuhei Hirokawa
 * @version 1.0.0
 */

/**
 * @class 結果を表示するシーンクラスです。<br />
 * 完成したアイスの個数や合計スコアの表示、結果をツイート、タイトル画面に戻る機能があります。
 */
ResultScene = Class.create(Scene, {
	// 初期化
	initialize : function(){
        // クラスのコンストラクタ呼び出し
		Scene.call(this);
        // 背景色の設定
		this.backgroundColor = 'black';
        // 外部のthisを使用する用の変数
		var that = this;
        // 生産数の作成
        this.productionSumText = new Sprite(96, 168);
        this.productionSumText.image = core.assets[PRODACTION_TEXT_IMAGE];
        this.productionSumText.moveTo(50, 0);
        this.addChild(this.productionSumText);
        // softServeIceCreamの作成
        this.softServeIceCream = new Ices(140, -10, 0);
        this.addChild(this.softServeIceCream);
        // softServeIceCreamSumTextの作成
        this.softSumText = new MutableText(360, 270, 80);
        this.softSumText.moveTo(core.width/2-this.softSumText.width/2-30, 35);
        this.softSumText.text = " X " + softServeIceCreamSum;
        this.addChild(this.softSumText);

        // iceCandyの作成
        this.iceCandy = new Ices(140, 50, 1);
        this.addChild(this.iceCandy);
        // iceCandySumTextの作成
        this.candySumText = new MutableText(360, 270, 80);
        this.candySumText.moveTo(core.width/2-this.candySumText.width/2-30, 90);
        this.candySumText.text = " X " + iceCandySum;
        this.addChild(this.candySumText);

        // sherbetの作成
        this.sherbet = new Ices(140, 100, 2);
        this.addChild(this.sherbet);
        // sherbetSumTextの作成
        this.sherbetSumText = new MutableText(360, 270, 80);
        this.sherbetSumText.moveTo(core.width/2-this.sherbetSumText.width/2-30, 145);
        this.sherbetSumText.text = " X " + sherbetSum;
        this.addChild(this.sherbetSumText);

        // ScoreTextの作成
        this.scoreText = new MutableText(360, 270, 80);
        this.scoreText.moveTo(core.width/2-this.scoreText.width/2 + 100, 50);
        this.scoreText.text = "SCORE";
        this.addChild(this.scoreText);

        // Scoreの作成
        this.scoreLabel = new ScoreLabel(360, 290, false);
        this.scoreLabel.score = core.score;
        this.addChild(this.scoreLabel);

        // Tweetできるボタンの作成
        this.TweetButton = new Sprite(BUTTON_WIDTH, BUTTON_HEIGHT);
        this.TweetButton.image = core.assets[TWEET_BUTTON_IMAGE];
        this.TweetButton.frame = BUTTON_TOUCH_TYPE;
        this.TweetButton.moveTo(core.width/2-this.TweetButton.width/2, 180);
        this.addChild(this.TweetButton);
        // ボタンをタッチしたら
        this.TweetButton.ontouchstart = function(){
            this.frame = BUTTON_TOUCHED_TYPE;
        };
        // ボタンを離したら
        this.TweetButton.ontouchend = function(){
            this.frame = BUTTON_TOUCH_TYPE;
            // シーンの切り替え
            that.tl.delay(10).then(function(){
                // Twitter に移動
                var message = "貴方の生産力は" + core.score + "と判断されました！";
                window.open(TWITTER_URL+EUC(message), "_blank");   // 新しくタブを開く
            });
        };
        
        // タイトルへ戻るボタン生成
		this.TitleButton = new Sprite(BUTTON_WIDTH, BUTTON_HEIGHT);
        this.TitleButton.image = core.assets[TITLE_BUTTON_IMAGE];
        this.TitleButton.frame = BUTTON_TOUCH_TYPE;
        this.TitleButton.moveTo(core.width/2-this.TitleButton.width/2, 240);
        this.addChild(this.TitleButton);
        // ボタンをタッチしたら
        this.TitleButton.ontouchstart = function(){
            this.frame = BUTTON_TOUCHED_TYPE;
        };
        // ボタンを離したら
        this.TitleButton.ontouchend = function(){
            this.frame = BUTTON_TOUCH_TYPE;
            // シーンの切り替え
            that.tl.delay(10).then(function(){
                core.scene = new TitleScene();
				core.replaceScene(core.scene);
            });
        };
	},
    // 更新処理
    onenterframe : function(){
        // 座標の調整
        this.scoreLabel.moveTo(core.width/2-this.scoreLabel.width/2 + 100, 100);
    }
});