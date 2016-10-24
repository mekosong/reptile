/**
 * Created by Administrator on 2016/10/14.
 */
var path = require('path');
// NodeJS中的Path对象，用于处理目录的对象，提高开发效率。
// 模块导入
module.exports = {
  module: {
    // 加载器
    loaders: [
      // 解析.vue文件
      { test: /\.vue$/, loader: 'vue' },
      // 转化ES6的语法
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      // 编译css并自动添加css前缀
      { test: /\.css$/, loader: 'style!css!autoprefixer'},
      //.scss 文件想要编译，scss就需要这些东西！来编译处理
      //install css-loader style-loader sass-loader node-sass --save-dev
      { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
      // 图片转化，小于8K自动转化为base64的编码
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'},
      //html模板编译？
      { test: /\.(html|tpl)$/, loader: 'vue-html-loader' },
    ]
  },
  // .vue的配置。需要单独出来配置
  vue: {
    loaders: {
      css: 'style!css!autoprefixer',
      html:'html-loader'
    }
  },
  // 转化成es5的语法
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  resolve: {
    // require时省略的扩展名，如：require('module') 不需要module.js
    extensions: ['', '.js', '.vue'],
    // 别名，可以直接使用别名来代表设定的路径以及其他
    alias: {
      filter: path.join(__dirname, './src/filters'),
      components: path.join(__dirname, './src/components')
    }
  },
  // 开启source-map，webpack有多种source-map，在官网文档可以查到
  devtool: 'eval-source-map'
};