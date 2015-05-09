var noflo = require('noflo');

var fibIter = function(payload) {
  return {
    a: payload.a + payload.b,
    b: payload.a,
    n: payload.n - 1
  };
};

exports.getComponent = function () {
  var c = new noflo.Component();

  c.inPorts.add('in', { datatype: 'int' }, function (event, payload) {
    if (event !== 'data') {
      return;
    }
    // Do something with the packet, then
    if(typeof payload == 'object') {
      if(payload.n !== 0) {
        payload = fibIter(payload);
        if(payload.b > Number.MAX_SAFE_INTEGER)
          throw new RangeError('Sorry, JavaScript fails to calculate integers after ' +
                               Number.MAX_SAFE_INTEGER);
        c.outPorts.out.send(payload);
      }
    } else {
      payload = fibIter({a: 1, b: 0, n: Number(payload)});
      c.outPorts.out.send(payload);
    }

  });
  c.outPorts.add('out');
  return c;
};
