/**
 * @fileOverview クラス化されていないグローバルメソッドを定義したファイル。
 *
 * @author Shuhei Hirokawa
 * @version 1.0.0
 */

/**
 * 整数な乱数の生成をする
 *
 * @return {Number}
 * @param {Number}  min 最小値
 * @param {Number}  max 最大値
 *
 * @example min ~ max - 1の乱数発生
 * var a = randfunc(1, 3); // 1~2の乱数生成
 */
var randfunc = function(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 少数な乱数の生成をする
 *
 * @return {Number}
 * @param {Number}  min 最小値
 * @param {Number}  max 最大値
 *
 * @example min ~ max - 1の乱数発生
 * var a = randfunc(1, 3); // 1.0~2.0の乱数生成
 */
var randfloot = function(min, max) {
    return Math.random()*(max-min)+min;
};

/**
 * 拡大縮小して画面外に消える処理
 */
var scaleBigScaleSmallMoveBy = function(){
    this.tl.scaleTo(1.5, 10)
           .scaleTo(1.0, 10)
           .then(function(){
                this.moveTo(0, 400);
        });
};