const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');

const webpackDevMiddleware= require('koa-webpack-dev-middleware');
const webpack = require('webpack');
const webpack_config = require('../webpack.config');
const compiler = webpack(webpack_config, (err,stats) =>{
   if(err || stats.hasErrors()){
      console.log('There are webpack exception', err, stats.toJson('minimal'));
      return;
   }
   console.log('webpack initialized successful!')
});

const app = new Koa();

// app.use(webpackDevMiddleware(compiler, {
//    publicPath: webpack_config.output.publicPath
// }));

app.use(serve('frontend/public'));

app.use(async (ctx, next) =>{
   ctx.response.body = 'Hello World';
   await next();
});


app.listen(8000);