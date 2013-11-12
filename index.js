var stream = require('stream');

module.exports = function(transformer) {
  var t = new stream.Transform({ objectMode: true });
  t._transform = function(chunk, encoding, cb) {
    if (transformer) {
      transformer.call(this, chunk, function(err, data) {
        if (data) {
          t.push(data);
        }
        cb(err);
      });
    }
    else {
      t.push(chunk);
      cb();
    }
  };
  return t;
};
