/**
 * @fileOverview タイトル画面を表示するシーンクラスを記述するファイルです。
 *
 * @author Shuhei Hirokawa
 * @version 1.0.0
 */

/**
 * @class タイトルのシーンのクラスです。
 * デモムービーの表示や遊び方の説明をするボタン、ゲーム開始ボタンの機能があります。
 */
TitleScene = Class.create(Scene, {
	// 初期化
	initialize : function(){
        // クラスのコンストラクタ呼び出し
		Scene.call(this);
        // 外部のthisを使用する用の変数
		var that = this;

        // レイヤー1の作成
        this.canvasLayerOne = new Group();
        this.addChild(this.canvasLayerOne);
        // レイヤー2の作成
        this.canvasLayerTwo = new Group();
        this.addChild(this.canvasLayerTwo);
        // レイヤー3の作成
        this.canvasLayerThree = new Group();
        this.addChild(this.canvasLayerThree);

        // 背景クラスの作成
        this.sceneBack = new BackGround(false);
        this.canvasLayerOne.addChild(this.sceneBack);

        // sideBarの作成
        this.sideBar = new Sprite(SIDE_BAR_WIDTH, SIDE_BAR_HEIGHT);
        this.sideBar.image = core.assets[SIDEBAR_IMAGE];
        this.sideBar.x = 320;
        this.canvasLayerOne.addChild(this.sideBar);

        // ソフトクリームのユニットの作成
        this.softUnit = new Sprite(ICES_SIZE, ICES_SIZE);
        this.softUnit.image = core.assets[SOFT_IMAGE];
        this.softUnit.moveTo(345, 70);
        this.canvasLayerOne.addChild(this.softUnit);

        // アイスキャンディーのユニットの作成
        this.iceCandyUnit = new Sprite(ICES_SIZE, ICES_SIZE);
        this.iceCandyUnit.image = core.assets[CANDY_IMAGE];
        this.iceCandyUnit.moveTo(382, 70);
        this.canvasLayerOne.addChild(this.iceCandyUnit);

        // シャーベットのユニットの作成
        this.sherbetUnit = new Sprite(ICES_SIZE, ICES_SIZE);
        this.sherbetUnit.image = core.assets[SHERBET_IMAGE];
        this.sherbetUnit.moveTo(415, 70);
        this.canvasLayerOne.addChild(this.sherbetUnit);

        // タイトル画像の作成
        this.titleSprite = new Sprite(300, 320);
        this.titleSprite.image = core.assets[TITLE_IMAGE];
        this.canvasLayerOne.addChild(this.titleSprite);

        // PlayButtonの作成
        this.playButton = new Sprite(BUTTON_WIDTH, BUTTON_HEIGHT);
        this.playButton.image = core.assets[PLAY_BUTTON_IMAGE];
        this.playButton.frame = BUTTON_TOUCH_TYPE;
        this.playButton.moveTo(SCENE_SCREEN/2-this.playButton.width/2, 180);
        this.playButton.visible = false;
        this.canvasLayerOne.addChild(this.playButton);

        // ボタンをタッチしたら
        this.playButton.ontouchstart = function(){
            if(this.visible){
                this.frame = BUTTON_TOUCHED_TYPE;
            }
        };
        // ボタンを離したら
        this.playButton.ontouchend = function(){
            if(this.visible){
                this.frame = BUTTON_TOUCH_TYPE;
                // シーンの切り替え
                that.tl.delay(10).then(function(){
                    core.scene = new PlayScene();
                    core.replaceScene(core.scene);
                });
            }
        };

        // ルールボタンの作成
        this.ruleButton = new Sprite(RULE_BUTTON_WIDTH, RULE_BUTTON_HEIGHT);
        this.ruleButton.image = core.assets[RULE_BUTTON_IMAGE];
        this.ruleButton.frame = BUTTON_TOUCH_TYPE;
        this.ruleButton.moveTo(340, 235);
        this.ruleButton.visible = false;
        this.canvasLayerOne.addChild(this.ruleButton);
        // ボタンをタッチしたら
        this.ruleButton.ontouchstart = function(){
            if(this.visible){
                this.frame = BUTTON_TOUCHED_TYPE;
            }
        };
        // ボタンを離したら
        this.ruleButton.ontouchend = function(){
            if(this.visible){
                this.frame = BUTTON_TOUCH_TYPE;
                // シーンの切り替え
                that.tl.delay(10).then(function(){
                    core.scene = new RuleScene();
                    core.replaceScene(core.scene);
                });
            }
        };

        // animation用の皿の作成
        this.Dish = new Sprite(ICES_SIZE, ICES_SIZE);
        this.Dish.image = core.assets[DISH_IMAGE];
        this.Dish.moveTo(280, 250);
        this.Dish.visible = false;
        this.canvasLayerTwo.addChild(this.Dish);

        // animation用の矢印の作成
        this.Arrow = new Sprite(ICES_SIZE, ICES_SIZE);
        this.Arrow.image = core.assets[ARROW_IMAGE];
        this.Arrow.moveTo(415, 400);
        this.Arrow.visible = false;
        this.canvasLayerTwo.addChild(this.Arrow);

        // animation用のアイスの作成
        this.Sherbet = new Sprite(ICES_SIZE, ICES_SIZE);
        this.Sherbet.image = core.assets[SHERBET_IMAGE];
        this.Sherbet.moveTo(415, 70);
        this.Sherbet.visible = false;
        this.canvasLayerTwo.addChild(this.Sherbet);

        // BOXの作成
        this.sceneBox = new Sprite(BOX_WIDTH, BOX_HEIGHT);
        this.sceneBox.image = core.assets[BOX_IMAGE];
        this.sceneBox.moveTo(257, 210);
        this.canvasLayerThree.addChild(this.sceneBox);
        // Textの作成
        this.skipText = new MutableText(85, 170, core.width);
        this.skipText.text = "Push Skip!";
        this.canvasLayerThree.addChild(this.skipText);
        this.skipText.tl.delay(15).fadeOut(30).fadeIn(30).loop();

	},
    // シーン開始時
    onenter : function(){
        // 完成したアイスの個数の初期化
        softServeIceCreamSum = 0;
        iceCandySum = 0;
        sherbetSum = 0;
        // 座標初期化
        this.Dish.moveTo(280, 250);
        this.Arrow.moveTo(415, 400);
        this.Sherbet.moveTo(415, 70);
        // アニメーション開始
        this.animation();
    },
    // シーン終了時
    onexit : function(){
        // 非表示
        this.sceneBox.visible = false;
        this.playButton.visible = false;
        this.ruleButton.visible = false;
    },
    // アニメーション
    animation : function(){
        // frameごとに処理
        this.tl.cue({
            0 : function(){
                this.sceneBack.activeFlag = true;
                this.Dish.visible = true;
                this.Dish.tl.moveBy(-150, 0, 30);
            },
            30: function(){
                this.sceneBack.activeFlag = false;
                this.Arrow.visible = true;
                this.Sherbet.visible = true;
                this.Arrow.tl.moveTo(430, 85, 30);
            },
            60: function(){
                this.Arrow.tl.moveBy(-284, 0, 30);
                this.Sherbet.tl.moveBy(-284, 0, 30);
            },
            90: function(){
                this.Sherbet.tl.moveBy(0, 175, 30);
            },
            120: function(){
                this.Sherbet.tl.scaleTo(1.5, 1.5, 10).scaleTo(1.0, 1.0, 10);
                this.Dish.tl.scaleTo(1.5, 1.5, 10).scaleTo(1.0, 1.0, 10);
            },
            140: function(){
                this.Dish.visible = false;
                this.Arrow.visible = false;
                this.Sherbet.visible = false;
                this.sceneBack.activeFlag = true;
                this.playButton.visible = true;
                this.ruleButton.visible = true;
                this.skipText.visible = false;
            }
        });
    },
    // タッチ開始
    ontouchstart : function(){
        // スキップできるように。
        this.tl.skip(200);
    }
});