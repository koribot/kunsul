// can define this in various build tools such as vite, webpack, etc...
// if you dont do this it will default to false and all the logging will be ignored in build
globalThis.KUNSUL_DEBUG = true;
const kunsul = require('../dist/kunsul.cjs');

console.log('🧪 Testing CommonJS build...');
kunsul.log('CommonJS log test');
kunsul.warn('CommonJS warn test');
kunsul.error('CommonJS error test');

// Test named imports
const { log, warn, error } = require('../dist/kunsul.cjs');
log('Named - log import test');
warn('Named - warn import test');
error('Named - error import test');
console.log('✅ CommonJS tests passed');