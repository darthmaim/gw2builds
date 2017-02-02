// Prevent mocha from interpreting CSS @import files
function noop() {
    return null;
}

require.extensions['.css'] = noop;
