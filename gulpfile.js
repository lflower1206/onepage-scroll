var gulp = require('gulp'),
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    gulpWebpack = require('gulp-webpack'),
    webpackConfig = require('./webpack.config.js'),
    del = require('del');

gulp.task('default', ['webpack-dev-server']);

gulp.task('webpack-dev-server', function(callback) {

    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = 'eval';
    myConfig.debug = true;

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        stats: {
            colors: true
        },
        contentBase: 'src',
        colors: true,
        hot: true
    }).listen(8080, 'localhost', function(err) {
        if(err) throw new gutil.PluginError('webpack-dev-server', err);
        gutil.log('[webpack-dev-server]', 'http://localhost:8080/index.html');
    });
});

gulp.task('build', ['clean'], function() {
    gulp.src('src/components/App.js')
        .pipe(gulpWebpack(require('./webpack.dist.config.js')))
        .pipe(gulp.dest('dist/'));
});

gulp.task('clean', function() {
    del('./build', function (err, paths) {
        if (paths) {
            console.log('Deleted files/folders:\n', paths.join('\n'));
        }
    });
});
