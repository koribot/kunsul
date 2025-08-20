// sample test in mjs environment

// Default import
import kunsul from '../dist/kunsul.esm.mjs';

// Named imports
import { log, warn, error } from '../dist/kunsul.esm.mjs';
console.log('🧪 Testing ES Modules build...');
kunsul.log('ESM default import test');
log('ESM named import test');
warn('ESM warn test');
error('ESM error test');

console.log('✅ ESM tests passed');

