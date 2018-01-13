const critical = require('critical'); // eslint-disable-line

critical
  .generate({
    inline: true,
    base: './',
    src: 'dist/index.html',
    dest: 'dist/index.html',
    dimensions: [
      {
        width: 320,
        height: 568
      },
      {
        width: 1280,
        height: 800
      }
    ],
    inlineImages: true,
    minify: true
  })
  .then(() => console.log('Successfully extracted critical CSS.'))
  .catch(err => console.log(err));
