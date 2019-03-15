function fix(target) {
    var baseUrl = ''
    var scripts = document.querySelectorAll("script");
    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src && (
            scripts[i].src.indexOf('main.js') != -1 ||
            scripts[i].src.indexOf('main.min.js') != -1
        )) {
            baseUrl = scripts[i].src.substr(0, scripts[i].src.lastIndexOf('/') + 1)
        }
    }
    return baseUrl + target
}

require.config({
    paths: {
        'react': fix('react.development'),
        'react-dom': fix('react-dom.development'),
        'prop-types': fix('prop-types'),
        'redux': fix('redux'),
        'react-redux': fix('react-redux'),
        'immutable': fix('immutable'),
        'ttk': fix('ttk-sdk'),
        <ext>
    },
    shim: {
    },
    map: {
        '*': {
            css: fix('css.js')
        }
    },
    waitSeconds: 0
})

require(['ttk'], function (ttk) {
    window.TTK = ttk
    window['main'] && window['main'](ttk)
})
