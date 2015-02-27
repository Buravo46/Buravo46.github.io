/**
 * @fileOverview メインを記述するファイルです。
 *
 * @author Shuhei Hirokawa
 * @version 1.0.0
 */

// ライブラリの読み込み
enchant();

/**
 * Webページを読み込んだら処理する
 */
window.onload = function(){
    core = new Core(SCREEN_WIDTH, SCREEN_HEIGHT);
    // アセット読み込み
    core.preload(ASSETS);
    core.score = 0;
    // coreを読み込んだら処理
    core.onload = function(){
        // タイトルシーンの生成
        core.scene = new TitleScene();
        // シーンの表示
        core.pushScene(core.scene);
    };
    // 開始
    core.start();
};


