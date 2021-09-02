const program = require('commander');

// fsモジュールをfsオブジェクトとしてインポート
const fs = require('fs');

// md2htmlモジュールのインポート
const md2html = require('./md2html');

// コマンドライン引数からファイルパスを取得
// gfmオプションの定義
program.option('--gfm', 'GFMを有効にする');
program.parse(process.argv);
const filePath = program.args[0];

// コマンドライン引数のオプションを取得
const options = program.opts();

// コマンドライン引数で指定されなかったオプションにデフォルト値を上書き
const cliOptions = {
  gfm: false,
  ...program.opts(),
};

// ファイルをutf-8で非同期で読み込み
fs.readFile(filePath, { encoding: 'utf-8' }, (err, file) => {
  if (err) {
    console.error(err.message);
    // 終了ステータス1（一般的なエラー）としてプロセス終了
    process.exit(1);
    return;
  }
  // md2htmlモジュールを使ってHTMLに変換
  const html = md2html(file, cliOptions);
  console.log(html);
});