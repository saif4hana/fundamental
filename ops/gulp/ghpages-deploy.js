const gulp = require('gulp');
const ghPages = require('gh-pages');

const paths = {
    srcPrepare: ['./docs/_site/**/*', './README.md'],
    destPrepare: './ghpages',
    srcDeploy: './ghpages/**/*'
}

//main task that should be used
const task = (cb) => {
    gulp.series('prepareDeploy', gulp.parallel('ghDeploy'));
    cb();
}

//Task to prepare folder with www and readme that are be deployed to ghpages
const prepareDeploy = (cb) => {
    gulp.src(paths.srcPrepare, {
            base: './'
        })
        .pipe(gulp.dest(paths.destPrepare));
    cb();
}

//Task for deploying compiled HTML to gh-pages branch for GitHub Pages hosting
const ghDeploy = (cb) => {
    ghPages.publish(paths.destPrepare, {
        repo: 'git@github.com:SAP/fundamental.git'
    });
    cb();
}

gulp.task('prepareDeploy', prepareDeploy);
gulp.task('ghDeploy', ghDeploy);
gulp.task('deploy', task);