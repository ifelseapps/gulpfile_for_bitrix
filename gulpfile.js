var
    path = require('path'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer');

var
    root = './www/local',
    paths = {
	templatePath: path.join(root, '/templates/main'),
	sassInc: path.join(root, 'sass')
    },

    projectFiles = [
	path.join(paths.templatePath, '*.scss'),
	path.join(paths.sassInc, '/**/*.scss')
    ];

var
    postProcessors = [autoprefixer({ "browsers": ["last 3 version"] })],
    sassConfig = {
	includePaths: paths.sassInc,
	outputStyle: 'compressed'
    };

gulp.task('styles', function ()
{
    return gulp.src(path.join(paths.templatePath, '*.scss'))
	.pipe(sass(sassConfig).on('error', sass.logError))
	.pipe(postcss(postProcessors))
	.pipe(gulp.dest(function (file)
	{
	    return file.base;
	}));
});

gulp.task('default', function ()
{
    gulp.watch(projectFiles, ['styles']);
});