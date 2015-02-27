/**
 * @fileOverview ゲームのプレイ画面を表示するシーンクラスを記述するファイルです。
 *
 * @author Shuhei Hirokawa
 * @version 1.0.0
 */

/**
 * @class ゲームのプレイ画面を表示するシーンクラスです。<br />
 * 器を順番通りに生成したり、遊び方を説明するボタン、<br />
 * 最後の終了の看板が消えたら結果を表示するシーンに飛ばす機能があります。
 */
PlayScene = Class.create(Scene, {
	// 初期化
	initialize : function(){
        // クラスのコンストラクタ呼び出し
		Scene.call(this);
        // 外部のthisを使用する用の変数
		var that = this;
        // ルールを一度表示したか否か
        this.ruleVisibleFlag = false;
        //ステージデータ
        this.stages = "_S______ _____3 _____2 _____1 ______ ___3___2___3 _____ ___2___3___2 _____ ___2___3___2 _____ ___2___1___2 _____ ___3___3___3___1 _____ ___2___2___3__3__3_____1_____2 ___2 ____2___2 _____1__1__1 _____F";
        //空白を削除
        this.stages = this.stages.replace(/ /g, "");

        //出現パターン 
        this.patterns = {
            _: [{typ: 'space'}],
            1: [{typ: 'cone', nam: "cone"}],
            2: [{typ: 'stick', nam: "stick"}],
            3: [{typ: 'dish', nam: "dish"}],
            S: [{typ: 'start', nam: "start"}],
            F: [{typ: 'finish', nam: "finish"}]
        };
        this.bpm = 240;
        this.beatSpan = 10;
        this.beatCount = 0;
        this.time = 0;

        // レイヤー1の作成
        this.canvasLayerOne = new Group();
        this.addChild(this.canvasLayerOne);
        // レイヤー2の作成
        this.canvasLayerTwo = new Group();
        this.addChild(this.canvasLayerTwo);
        // レイヤー3の作成
        this.canvasLayerThree = new Group();
        this.addChild(this.canvasLayerThree);

		// 背景の作成
        this.sceneBack = new BackGround(true);
        this.canvasLayerOne.addChild(this.sceneBack);

        // sideBarの作成
        this.sideBar = new Sprite(SIDE_BAR_WIDTH, SIDE_BAR_HEIGHT);
        this.sideBar.image = core.assets[SIDEBAR_IMAGE];
        this.sideBar.x = 320;
        this.canvasLayerOne.addChild(this.sideBar);

        // ソフトクリームのユニットの作成
        this.softUnit = new SoftServeIceCreamUnit(345, 70);
        this.canvasLayerTwo.addChild(this.softUnit);

        // アイスキャンディーのユニットの作成
        this.iceCandyUnit = new IceCandyUnit(382, 70);
        this.canvasLayerTwo.addChild(this.iceCandyUnit);

        // シャーベットのユニットの作成
        this.sherbetUnit = new SherbetUnit(415, 70);
        this.canvasLayerTwo.addChild(this.sherbetUnit);

        // Scoreの作成
        this.scoreLabel = new ScoreLabel(30, 15, true);
        this.scoreLabel.score = 0;
        this.canvasLayerThree.addChild(this.scoreLabel);

        // HelpButtonの作成
        this.helpButton = new HelpButton(335, 243);
        this.canvasLayerThree.addChild(this.helpButton);
        // BOXの作成
        this.sceneBox = new Sprite(BOX_WIDTH, BOX_HEIGHT);
        this.sceneBox.image = core.assets[BOX_IMAGE];
        this.sceneBox.moveTo(257, 210);
        this.canvasLayerThree.addChild(this.sceneBox);
	},
    // シーン開始時
	onenter : function(){
		core.frame = 20;
		core.score = 0;
		this.scoreLabel.score = 0;
        // ルールを表示していなければ表示する
        if(!this.ruleVisibleFlag){
            core.scene = new OneRuleScene();
            core.pushScene(core.scene);
        }
	},
    // 毎フレーム
	onenterframe : function(){
        // スコアが０以下ならば０と表示する
        if(core.score <= 0){
            this.scoreLabel.score = 0;
            core.score = 0;
            this.scoreLabel.score = core.score;
        }else{ // そうでないなら変わらず表示する
            this.scoreLabel.score = core.score;
        }
        this.time++;
        // ビート
        this.beatCount = Math.floor(this.time / this.beatSpan);
        // ビートに基づいて
        if((this.beatCount) >= 0 && this.time % (this.beatSpan) === 0){
            // もしも生産し切って、生産終了が見えなくなれば
            if(this.beatCount > this.stages.length && !this.finish.visible){
                core.scene = new ResultScene();
                core.replaceScene(core.scene);
            }else{ // そうでないならば生産していく
                pattern = this.patterns[this.stages.charAt(this.beatCount)];
                for(var i in pattern){
                    var obj = pattern[i];
                    if(obj.typ == 'cone'){ // Coneの作成
                        this.cone = new Cone(280, 250);
                        this.canvasLayerTwo.addChild(this.cone);
                        cones.push(this.cone);
                    }else if(obj.typ == 'stick'){ // Stickの作成
                        this.stick = new Stick(280, 250);
                        this.canvasLayerTwo.addChild(this.stick);
                        sticks.push(this.stick);
                    }else if(obj.typ == 'dish'){ // Dishの作成
                        this.dish = new Dish(280, 250);
                        this.canvasLayerTwo.addChild(this.dish);
                        dishes.push(this.dish);
                    }else if(obj.typ == 'start'){ // Startの作成
                        this.started = new SignBoard(280, 220, START_BOARD_NUMBER);
                        this.canvasLayerTwo.addChild(this.started);
                    }else if(obj.typ == 'finish'){ // Finishの作成
                        this.finish = new SignBoard(280, 220, FINISH_BOARD_NUMBER);
                        this.canvasLayerTwo.addChild(this.finish);
                    }else if(obj.typ){
                    }
                }
            }
        }
	},
    // シーン終了時
	onexit : function(){
        // 初期化
		softServeIceCreams = [];
        cones = [];
        iceCandies = [];
        sticks = [];
        sherbets = [];
        dishes = [];
        texts = [];
	}
});
