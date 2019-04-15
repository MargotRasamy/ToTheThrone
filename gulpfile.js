// Requis
var gulpfile = require('gulp');

// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json

// Variables de chemins
var source = 'src/'; // dossier de travail
var destination = 'assets/'; // dossier à livrer
const jsSource = 'src/scripts/',
    jsDestination = 'assets/scripts/'

gulpfile.task('jsMinifier_game', function(done) {
    gulpfile.src([jsSource+"main.js",jsSource+"game/*.js"]) // path to your files
        .pipe(plugins.concat("game.js"))
        .pipe(plugins.rename({
            'suffix': '.min'
        }))
        .pipe(gulpfile.dest(jsDestination));
    done()
});
gulpfile.task('jsMinifier_landing', function(done) {
    gulpfile.src([jsSource+"main.js",jsSource+"landing_page/*.js"]) // path to your files
        .pipe(plugins.concat("main.js"))
        .pipe(plugins.rename({
            'suffix': '.min'
        }))
        .pipe(gulpfile.dest(jsDestination));
    done()
});

gulpfile.task('jsLint', function(done) {
    gulpfile.src(jsSource+"/**/*.js") // path to your files
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter()); // Dump results
    done()
})

gulpfile.task('sass', function() {
    return gulpfile.src(source + 'scss/main.scss')
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer())
        .pipe(gulpfile.dest(destination + 'styles/'))
});

gulpfile.task('cssMinfier', function() {
    return gulpfile.src(destination + 'styles/main.css')
        .pipe(plugins.csso())
        .pipe(plugins.rename({
            'suffix': '.min'
        }))
        .pipe(gulpfile.dest(destination + 'styles/'))
});

gulpfile.task('css', gulpfile.series('sass', 'cssMinfier'))
gulpfile.task('js_game', gulpfile.series('jsLint', 'jsMinifier_game'))
gulpfile.task('js_landing', gulpfile.series('jsLint', 'jsMinifier_landing'))

gulpfile.task('watch', function() {
    gulpfile.watch('./src/scripts/game/*.js', gulpfile.series('js_game'))
    gulpfile.watch('./src/scripts/landing_page/*.js', gulpfile.series('js_landing'))
    gulpfile.watch('./src/scripts/main.js', gulpfile.series('js_game', 'js_landing'))
    gulpfile.watch('./src/scss/**/*.scss', gulpfile.series('css'))
});

gulpfile.task('default', gulpfile.series('watch'));