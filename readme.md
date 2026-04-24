# thru
minimalist transform stream implementation

NOTICE: The [thru](https://www.npmjs.com/package/thru) package on npm has been transferred to [~thru-core](https://www.npmjs.com/~thru-core) following this release [0.0.3](https://www.npmjs.com/package/thru/v/0.0.3) by me [~jessetane](https://www.npmjs.com/~jessetane) on April 24, 2026. The source code for releases predating the transfer can be found at [https://github.com/jessetane/thru](https://github.com/jessetane/thru).

## why
sugar for [`stream.Transform`](http://nodejs.org/api/stream.html#stream_class_stream_transform)

## how
```javascript
var thru = require('thru');

var input = thru();

var inflate = thru(function(obj, cb) {
  if (obj === 'a') {
    this.push('a');
    this.push('b');
    cb();
  } else {
    cb(null, obj);
  }
});

var modify = thru(function(obj, cb) {
  if (obj === 'd') obj = 'c';
  cb(null, obj);
});

var deflate = thru(function(obj, cb) {
  if (obj === 'e') cb();
  else cb(null, obj);
});

var newlines = thru(function(obj, cb) {
  cb(null, obj + '\n');
});

input
  .pipe(inflate)
  .pipe(modify)
  .pipe(deflate)
  .pipe(newlines)
  .pipe(process.stdout);

newlines.on('end', function() {
  console.log('done!');
});

input.write('a'); // a
                  // b
input.write('d'); // c
input.write('e');
input.end();      // done!
```

## inspiration
[through](https://github.com/dominictarr/through)  
[through2](https://github.com/rvagg/through2)

## license
WTFPL