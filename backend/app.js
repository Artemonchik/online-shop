const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const send = require('koa-send');
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
   if(!ctx.path.startsWith('/api/')){
      await send(ctx, '/index.html', { root: path.resolve('frontend/public')});
   }else{
      await next();
   }
});


app.listen(8000);