/**
 * @fileOverview ゲーム説明をするシーンクラスを記述するファイルです。
 *
 * @author Shuhei Hirokawa
 * @version 1.0.0
 */

/**
 * @class ゲームの説明をするクラスです。
 */
RuleScene = Class.create(Scene, {
	// 初期化
	initialize : function(){
        // クラスのコンストラクタ呼び出し
		Scene.call(this);
        // 外部のthisを使用する用の変数
		var that = this;
		// ルールの生成
        this.gameRule = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
        this.gameRule.image = core.assets[GAME_RULE_IMAGE];
        this.gameRule.frame = GAME_RULE_FIRST_PAGE;
        this.addChild(this.gameRule);

        // 次のページに進むボタン生成
        this.nextPageButton = new Sprite(BUTTON_WIDTH, BUTTON_HEIGHT);
        this.nextPageButton.image = core.assets[NEXT_PAGE_BUTTON_IMAGE];
        this.nextPageButton.frame = BUTTON_TOUCH_TYPE;
        this.nextPageButton.moveTo(335, 265);
        this.addChild(this.nextPageButton);
        // ボタンをタッチしたら
        this.nextPageButton.ontouchstart = function(){
            this.frame = BUTTON_TOUCHED_TYPE;
        };
        // ボタンを離したら
        this.nextPageButton.ontouchend = function(){
            this.frame = BUTTON_TOUCH_TYPE;
            that.gameRule.frame++;
            if(that.gameRule.frame > GAME_RULE_LAST_PAGE){
                that.gameRule.frame = GAME_RULE_FIRST_PAGE;
            }
        };

        // タイトルへ戻るボタンの作成
        this.TitleButton = new Sprite(BUTTON_WIDTH, BUTTON_HEIGHT);
        this.TitleButton.image = core.assets[TITLE_BUTTON_IMAGE];
        this.TitleButton.frame = BUTTON_TOUCH_TYPE;
        this.TitleButton.moveTo(335, 218);
        this.TitleButton.visible = true;
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
    // シーン開始時
    onenter : function(){
        this.gameRule.frame = GAME_RULE_FIRST_PAGE;
    }
});

/**
 * @class ゲームの説明を一枚の画像でするクラスです。
 * 
 */
OneRuleScene = Class.create(Scene, {
    // 初期化
    initialize : function(){
        // クラスのコンストラクタ呼び出し
        Scene.call(this);
        // 外部のthisを使用する用の変数
        var that = this;

        // 透明度0.5の白色背景の作成
        this.surface = new Surface(SCREEN_WIDTH, SCREEN_HEIGHT);
        this.surface.context.fillStyle = 'rgba(254, 254, 254, 0.5)';
        this.surface.context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        // 透明度0.5の白色背景画像背景の作成
        this.back = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
        this.back.image = this.surface;
        this.addChild(this.back);

        // ルールの作成
        this.gameRule = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
        this.gameRule.image = core.assets[ONE_GAME_RULE_IMAGE];
        this.addChild(this.gameRule);
        // ボタンを押したら
        this.ontouchstart = function(){
            // シーンの切り替え
            that.tl.delay(10).then(function(){
                core.scene = new PlayScene();
                core.scene.ruleVisibleFlag = true;
                core.popScene();
                core.pushScene(core.scene);
            });
        };
        // Textの作成
        this.startText = new MutableText(175, 300, core.width);
        this.startText.text = "Push Start!";
        this.addChild(this.startText);
        this.startText.tl.delay(15).fadeOut(30).fadeIn(30).loop();
    }
});