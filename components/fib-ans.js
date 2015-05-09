var noflo = require('noflo');

exports.getComponent = function () {
  var c = new noflo.Component();

  c.inPorts.add('in', function (event, payload) {
    if (event !== 'data') {
      return;
    }
    // Do something with the packet, then
    if(payload.n === 0)
      c.outPorts.out.send(payload.b);
  });
  c.outPorts.add('out');
  return c;
};
