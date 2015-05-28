var gulp = require('gulp'),
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    webpackConfig = require('./webpack.config.js'),
    compass = require('gulp-compass'),
    rename = require('gulp-rename');

var paths = {
    src: {
        path: 'src',
        assets: 'assets/**/*.*',
        sass: 'src/sass/**/*.scss',
    },
    dist: {
        path: 'dist',
        assets: 'build/assets/',
        css: 'dist/css',
    }
};

/* gulp.task('build-sass', function() {
    gulp.src(paths.src.sass)
        .pipe(compass({
            sass: 'src/sass',
            css: 'build/css',
            image: 'assets/images',
            require: ['susy', 'breakpoint'],
            comments: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest(paths.dist.css));
}); */

gulp.task('build-sass:watch', function() {

    gulp.watch(paths.src.sass, function() {
        gulp.src(paths.src.sass)
            .pipe(compass({
                sass: 'src/sass',
                css: 'dist/css',
                image: 'assets/images',
                comments: false
            }))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(paths.dist.css));
    });

});

// gulp.task('default', ['webpack-dev-server', 'build-sass:watch']);
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
