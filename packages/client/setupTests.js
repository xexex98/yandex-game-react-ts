var enzyme = require('enzyme');
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
var Adapter = require('@wojtekmaj/enzyme-adapter-react-17');

enzyme.configure({ adapter: new Adapter() });