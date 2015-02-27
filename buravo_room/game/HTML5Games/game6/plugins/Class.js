/**
 * @fileOverview ゲームに使用するオブジェクトクラスを記述するファイルです。
 *
 * @author Shuhei Hirokawa
 * @version 1.0.0
 */

/**
 * オブジェクトの座標をセットします。
 * @class ソフトクリームのクラスです。<br />
 * 器であるConeとの当たり判定、当たった時のアニメーションの機能があります。    
 * @param   {Number} posX,posY 座標
 */
var SoftServeIceCream = Class.create(Sprite,{
    // 初期化
	initialize:function(posX, posY){
		Sprite.call(this, ICES_SIZE, ICES_SIZE);
		this.image = core.assets[SOFT_IMAGE];
		this.x = posX;
		this.y = posY;
        this.speedX = 1;
        this.speedY = 1;
        this.distance = Math.floor((250 - posY));
        if(this.distance <= 0) this.distance = 0;
        this.isHitFlag = false;
	},
    // 更新処理
    onenterframe : function(){
        // 当たっていなければ落ちていく
        if(!this.isHitFlag){
            this.y += this.speedY;
        }
        // 当たっていれば一緒に流れていく
        if(this.isHitFlag){
            this.x -= this.speedX;
            if(this.y >= SCENE_SCREEN){
                core.score += 100 * this.distance;
                this.remove();
                delete this;
                softServeIceCreamSum++;
            }
        }
        // 画面外まで落ちたら
        if((this.x <= 0 - 50 || this.y >= SCENE_SCREEN) && !this.isHitFlag){
            this.remove();
            delete this;
            // テキストの作成
            var minusPoint = new PointLabel(this.x - 16, this.y - 16, 1, 100 * this.distance);
            core.currentScene.addChild(minusPoint);
            texts.push(minusPoint);
        }
        // コーンとの当たり判定
        for(var i in cones){
            if(this.within(cones[i], 16) && !this.isHitFlag && !cones[i].isHitFlag){
                // テキストの作成
                var plusPoint = new PointLabel(this.x - 16, this.y, 0, 100 * this.distance);
                core.currentScene.addChild(plusPoint);
                texts.push(plusPoint);
                // HIT
                this.isHitFlag = true;
                cones[i].isHitFlag = true;
                // アニメーション
                this.tl.exec(scaleBigScaleSmallMoveBy);
                cones[i].tl.exec(scaleBigScaleSmallMoveBy);
            }
        }
    }
});

/**
 * オブジェクトの座標をセットします。
 * @class アイスキャンディーのクラスです。<br />
 * 器であるStickとの当たり判定、当たった時のアニメーションの機能があります。    
 * @param   {Number} posX,posY 座標
 */
var IceCandy = Class.create(Sprite,{
    // 初期化
    initialize:function(posX, posY){
        Sprite.call(this, ICES_SIZE, ICES_SIZE);
        this.image = core.assets[CANDY_IMAGE];
        this.x = posX;
        this.y = posY;
        this.speedX = 1;
        this.speedY = 3;
        this.distance = Math.floor((250 - posY));
        if(this.distance <= 0) this.distance = 0;
        this.isHitFlag = false;
    },
    // 更新処理
    onenterframe : function(){
        // 当たっていなければ落ちていく
        if(!this.isHitFlag){
            this.y += this.speedY;
        }
        // 当たっていれば一緒に流れていく
        if(this.isHitFlag){
            this.x -= this.speedX;
            if(this.y >= SCENE_SCREEN){
                core.score += 50 * this.distance;
                this.remove();
                delete this;
                iceCandySum++;
            }
        }
        // 画面外まで落ちたら
        if((this.x <= 0 - 50 || this.y >= SCENE_SCREEN) && !this.isHitFlag){
            this.remove();
            delete this;
            // テキストの作成
            var minusPoint = new PointLabel(this.x - 16, this.y - 16, 1, 50 * this.distance);
            core.currentScene.addChild(minusPoint);
            texts.push(minusPoint);
        }
        // 棒との当たり判定
        for(var i in sticks){
            if(this.within(sticks[i], 16) && !this.isHitFlag && !sticks[i].isHitFlag){
                // テキストの作成
                var plusPoint = new PointLabel(this.x - 16, this.y, 0, 50 * this.distance);
                core.currentScene.addChild(plusPoint);
                texts.push(plusPoint);
                // HIT
                this.isHitFlag = true;
                sticks[i].isHitFlag = true;
                // アニメーション
                this.tl.exec(scaleBigScaleSmallMoveBy);
                sticks[i].tl.exec(scaleBigScaleSmallMoveBy);
            }
        }
    }
});

/**
 * オブジェクトの座標をセットします。
 * @class シャーベットのクラスです。<br />
 * 器であるDishとの当たり判定、当たった時のアニメーションの機能があります。    
 * @param   {Number} posX,posY 座標
 */
var Sherbet = Class.create(Sprite,{
    // 初期化
    initialize:function(posX, posY){
        Sprite.call(this, ICES_SIZE, ICES_SIZE);
        this.image = core.assets[SHERBET_IMAGE];
        this.x = posX;
        this.y = posY;
        this.speedX = 1;
        this.speedY = 0;
        this.accelY = 0.45;
        this.distance = Math.floor((250 - posY));
        if(this.distance <= 0) this.distance = 0;
        this.isHitFlag = false;
    },
    // 更新処理
    onenterframe : function(){
        // 当たっていなければ落ちていく
        if(!this.isHitFlag){
            this.speedY += this.accelY;
            this.y += this.speedY;
        }
        // 当たっていれば一緒に流れていく
        if(this.isHitFlag){
            this.x -= this.speedX;
            if(this.y >= SCENE_SCREEN){
                core.score += 10 * this.distance;
                this.remove();
                delete this;
                sherbetSum++;
            }
        }
        // 画面外まで落ちたら
        if((this.x <= 0 - 50 || this.y >= SCENE_SCREEN) && !this.isHitFlag){
            this.remove();
            delete this;
            // テキストの作成
            var minusPoint = new PointLabel(this.x - 16, this.y - 16, 1, 10 * this.distance);
            core.currentScene.addChild(minusPoint);
            texts.push(minusPoint);
        }
        // 皿との当たり判定
        for(var i in dishes){
            if(this.within(dishes[i], 16) && !this.isHitFlag && !dishes[i].isHitFlag){
                // テキスト表示
                var plusPoint = new PointLabel(this.x - 16, this.y, 0, 10 * this.distance);
                core.currentScene.addChild(plusPoint);
                texts.push(plusPoint);
                // Hit
                this.isHitFlag = true;
                dishes[i].isHitFlag = true;
                // アニメーション
                this.tl.exec(scaleBigScaleSmallMoveBy);
                dishes[i].tl.exec(scaleBigScaleSmallMoveBy);
            }
        }
    }
});

/**
 * オブジェクトの座標をセットします。
 * @class コーンのクラスです。<br />
 * 常に左へ進む処理、画面から見えなくなると消去する機能があります。
 * @param   {Number} posX,posY 座標
 */
var Cone = Class.create(Sprite,{
    // 初期化
	initialize:function(posX, posY){
		Sprite.call(this, ICES_SIZE, ICES_SIZE);
		this.image = core.assets[CONE_IMAGE];
		this.x = posX;
		this.y = posY;
        this.speedX = 1;
        this.isHitFlag = false;
	},
    // 更新処理
    onenterframe : function(){
        this.x -= this.speedX;
        if(this.x <= 0 - 50 || this.y >= SCENE_SCREEN){
            this.remove();
            delete this;
        }
    }
});

/**
 * オブジェクトの座標をセットします。
 * @class 棒のクラスです。<br />
 * 常に左へ進む処理、画面から見えなくなると消去する機能があります。
 * @param   {Number} posX,posY 座標
 */
var Stick = Class.create(Sprite,{
    // 初期化
    initialize:function(posX, posY){
        Sprite.call(this, ICES_SIZE, ICES_SIZE);
        this.image = core.assets[STICK_IMAGE];
        this.x = posX;
        this.y = posY;
        this.speedX = 1;
        this.isHitFlag = false;
    },
    // 更新処理
    onenterframe : function(){
        this.x -= this.speedX;
        if(this.x <= 0 - 50 || this.y >= SCENE_SCREEN){
            this.remove();
            delete this;
        }
    }
});

/**
 * オブジェクトの座標をセットします。
 * @class 皿のクラスです。<br />
 * 常に左へ進む処理、画面から見えなくなると消去する機能があります。
 * @param   {Number} posX,posY 座標
 */
var Dish = Class.create(Sprite,{
    // 初期化
    initialize:function(posX, posY){
        Sprite.call(this, ICES_SIZE, ICES_SIZE);
        this.image = core.assets[DISH_IMAGE];
        this.x = posX;
        this.y = posY;
        this.speedX = 1;
        this.isHitFlag = false;
    },
    // 更新処理
    onenterframe : function(){
        this.x -= this.speedX;
        if(this.x <= 0 - 50 || this.y >= SCENE_SCREEN){
            this.remove();
            delete this;
        }
    }
});


/**
 * オブジェクトの座標、表示するアイスの番号をセットします。
 * @class 使用するアイスを選んで表示するクラスです。<br />
 * @param   {Number} posX,posY 座標
 * @param   {Number} frame 0:soft, 1:candy, 2:sherbet
 */
var Ices = Class.create(Sprite,{
    // 初期化
    initialize:function(posX, posY, frame){
        Sprite.call(this, ICES_SIZE, ICES_SIZE*3);
        this.image = core.assets[ICES_IMAGE];
        this.x = posX;
        this.y = posY;
        this.frame = frame;
    }
});

/**
 * オブジェクトの座標、表示する看板の番号をセットします。
 * @class 開始と終了のどっちを表示するか選択し看板を表示するクラスです。<br />
 * 常に左へ進む処理、画面から見えなくなると消去する機能があります。
 * @param   {Number} posX,posY 座標
 * @param   {Number} frame 0:start, 1:finish
 */
var SignBoard = Class.create(Sprite,{
    // 初期化
    initialize:function(posX, posY, frame){
        Sprite.call(this, SIGN_BOARD_WIDTH, SIGN_BOARD_HEIGHT);
        this.image = core.assets[SIGN_BOARD_IMAGE];
        this.x = posX;
        this.y = posY;
        this.frame = frame;
        this.speedX = 1;
        this.visible = true;
    },
    // 更新処理
    onenterframe : function(){
        this.x -= this.speedX;
        if(this.x <= 0 - 50 || this.y >= SCENE_SCREEN){
            this.visible = false;
            this.remove();
            delete this;
        }
    }
});

/**
 * オブジェクトの座標、加算減算のどちらかを選択する値、表示されるポイントをセットします。
 * @class スコアの加算減算するポイントを表示するクラスです。<br />
 * セットされた値の表示、徐々に透明になる機能があります。
 * @param   {Number} posX,posY 座標
 * @param   {Number} number 0:加算用のテキスト, 1:減算用のテキスト
 * @param   {Number} point 表示されるポイント
 */
var PointLabel = Class.create(MutableText,{
    // 初期化
    initialize: function(posX, posY, number, point){
        MutableText.call(this, 0, 0);
        this.x = posX;
        this.y = posY;
        this.flag = number;
        this.getPoint = point;
        this.count = 0;
        // テキスト選択
        switch(this.flag){
            case 0:
            this.text = '+' + this.getPoint;
            break;
            case 1:
            this.text = '-' + this.getPoint;
            core.score -= this.getPoint;
            break;
        }
    },
    // 更新処理
    onenterframe : function(){
        if(core.fps % 30 === 0){
            this.y--;
            this.count++;
        }
        if(this.count >= 15){
            this.opacity -= 0.1;
            if(this.opacity <= 0){
                this.remove();
            }
        }
    }
});

/**
 * オブジェクトが動いているかどうかのフラグをセットします。
 * @class 背景を表示するクラスです。<br />
 * 固定横スクロールをする機能があります。
 * @param   {Boolean} active 最初から動かすかどうかのフラグ
 */
var BackGround = Class.create(Group,{
    // 初期化
    initialize:function(active){
        Group.call(this);
        this.activeFlag = active;
        // 背景の作成
        this.back = new Sprite(SCENE_SCREEN,SCENE_SCREEN)
        this.back.image = core.assets[BACK_IMAGE];
        this.back.x = 0;
        this.back.y = 0;
        this.back.frame = 0;
        this.addChild(this.back);
        // ベルトコンベアの作成
        this.beltConveyor = new Sprite(960,SCENE_SCREEN);
        this.beltConveyor.image = core.assets[BELT_CONVEYOR_IMAGE];
        this.beltConveyor.x = 0;
        this.beltConveyor.y = 0;
        this.beltConveyor.speedX = 1;
        this.addChild(this.beltConveyor);
    },
    // 更新処理
    onenterframe : function(){
        if(this.activeFlag){
                this.beltConveyor.x -= this.beltConveyor.speedX;
                if (this.beltConveyor.x <= -313) this.beltConveyor.x = 0;
        }
    }
});

/**
 * オブジェクトの座標をセットします。
 * @class Drag&Dropできるソフトクリームのユニットを表示するクラスです。<br />
 * Dragしつつ一定範囲内でDropすると、アイスを生成してこのオブジェクトを元の位置にもどす機能があります。
 * @param   {Number} posX,posY 座標
 */
var SoftServeIceCreamUnit = Class.create(Sprite,{
    // 初期化
    initialize:function(posX, posY){
        Sprite.call(this, ICES_SIZE, ICES_SIZE);
        this.image = core.assets[SOFT_IMAGE];
        this.x = posX;
        this.y = posY;
    },
    // タッチ開始
    ontouchstart : function(e){
        this.x = e.x - ICES_SIZE/2;
        this.y = e.y - ICES_SIZE/2;
    },
    // タッチしつつ移動中
    ontouchmove : function(e){
        this.x = e.x - ICES_SIZE/2;
        this.y = e.y - ICES_SIZE/2;
    },
    // タッチして指を離した瞬間
    ontouchend : function(e){
        // 画面内
        if(e.x <= SCENE_SCREEN - ICES_SIZE &&  e.y <= SCENE_SCREEN - ICES_SIZE){
            // ソフトクリームの生成
            core.currentScene.softServeIceCream = new SoftServeIceCream(e.x - ICES_SIZE/2, e.y - ICES_SIZE/2);
            core.currentScene.canvasLayerTwo.addChild(core.currentScene.softServeIceCream);
            softServeIceCreams.push(core.currentScene.softServeIceCream);
            this.moveTo(345, 70);
        }else{
            this.moveTo(345, 70);
        }
    }
});

/**
 * オブジェクトの座標をセットします。
 * @class Drag&Dropできるアイスキャンディーのユニットを表示するクラスです。<br />
 * Dragしつつ一定範囲内でDropすると、アイスを生成してこのオブジェクトを元の位置にもどす機能があります。
 * @param   {Number} posX,posY 座標
 */
var IceCandyUnit = Class.create(Sprite,{
    // 初期化
    initialize:function(posX, posY){
        Sprite.call(this, ICES_SIZE, ICES_SIZE);
        this.image = core.assets[CANDY_IMAGE];
        this.x = posX;
        this.y = posY;
    },
    // タッチ開始
    ontouchstart : function(e){
        this.x = e.x - ICES_SIZE/2;
        this.y = e.y - ICES_SIZE/2;
    },
    // タッチしつつ移動中
    ontouchmove : function(e){
        this.x = e.x - ICES_SIZE/2;
        this.y = e.y - ICES_SIZE/2;
    },
    // タッチして指を離した瞬間
    ontouchend : function(e){
        // 画面内
        if(e.x <= SCENE_SCREEN - ICES_SIZE &&  e.y <= SCENE_SCREEN - ICES_SIZE){
            // アイスキャンディーの生成
            core.currentScene.iceCandy = new IceCandy(e.x - ICES_SIZE/2, e.y - ICES_SIZE/2);
            core.currentScene.canvasLayerTwo.addChild(core.currentScene.iceCandy);
            iceCandies.push(core.currentScene.iceCandy);
            this.moveTo(382, 70);
        }else{
            this.moveTo(382, 70);
        }
    }
});

/**
 * オブジェクトの座標をセットします。
 * @class Drag&Dropできるシャーベットのユニットを表示するクラスです。<br />
 * Dragしつつ一定範囲内でDropすると、アイスを生成してこのオブジェクトを元の位置にもどす機能があります。
 * @param   {Number} posX,posY 座標
 */
var SherbetUnit = Class.create(Sprite,{
    // 初期化
    initialize:function(posX, posY){
        Sprite.call(this, ICES_SIZE, ICES_SIZE);
        this.image = core.assets[SHERBET_IMAGE];
        this.x = posX;
        this.y = posY;
    },
    // タッチ開始
    ontouchstart : function(e){
        this.x = e.x - ICES_SIZE/2;
        this.y = e.y - ICES_SIZE/2;
    },
    // タッチしつつ移動中
    ontouchmove : function(e){
        this.x = e.x - ICES_SIZE/2;
        this.y = e.y - ICES_SIZE/2;
    },
    // タッチして指を離した瞬間
    ontouchend : function(e){
        // 画面内
        if(e.x <= SCENE_SCREEN - ICES_SIZE &&  e.y <= SCENE_SCREEN - ICES_SIZE){
            // シャーベットの生成
            core.currentScene.sherbet = new Sherbet(e.x - ICES_SIZE/2, e.y - ICES_SIZE/2);
            core.currentScene.canvasLayerTwo.addChild(core.currentScene.sherbet);
            sherbets.push(core.currentScene.sherbet);
            this.moveTo(415, 70);
        }else{
            this.moveTo(415, 70);
        }
    }
});

/**
 * オブジェクトの座標をセットします。
 * @class 押したら遊び方の説明を呼び出すボタンのクラスです。<br />
 * ルール説明を生成し表示する機能があります。
 * @param   {Number} posX,posY 座標
 */
var HelpButton = Class.create(Sprite,{
    // 初期化
    initialize:function(posX, posY){
        Sprite.call(this, BUTTON_WIDTH, BUTTON_HEIGHT);
        this.image = core.assets[HELP_BUTTON_IMAGE];
        this.x = posX;
        this.y = posY;
        this.frame = BUTTON_TOUCH_TYPE;
    },
    // タッチ開始
    ontouchstart : function(){
        this.frame = BUTTON_TOUCHED_TYPE;
    },
    // タッチして指を離した瞬間
    ontouchend : function(){
        this.frame = BUTTON_TOUCH_TYPE;
        core.currentScene.tl.delay(10).then(function(){
            // 遊び方生成
            core.currentScene.gameRuleHelp = new GameRuleHelp();
            core.currentScene.addChild(core.currentScene.gameRuleHelp);
            // 停止
            core.pause();
        });
    }
});

/**
 * @class 遊び方の説明をするクラスです。<br />
 * タッチすれば再開する機能があります。
 */
var GameRuleHelp = Class.create(Group,{
    // 初期化
    initialize:function(){
        Group.call(this);
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
        // Textの作成
        this.startText = new MutableText(175, 300, core.width);
        this.startText.text = "Push Start!";
        this.addChild(this.startText);
        this.startText.tl.delay(15).fadeOut(30).fadeIn(30).loop();
    },
    // タッチして指を離した瞬間
    ontouchend : function(){
        // 再開
        core.resume();
        this.tl.delay(10).then(function(){
            core.currentScene.removeChild(this);
        });
    }
});




