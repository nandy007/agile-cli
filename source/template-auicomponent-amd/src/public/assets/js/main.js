require.config({
	waitSeconds: 0,
	baseUrl: './assets',
	//urlArgs: "r=" + (new Date()).getTime(),
    paths: {
		'css': './frameworks/amd/css',
		'less': './frameworks/amd/less',
		'lessc': './frameworks/amd/lessc',
		'normalize': './frameworks/amd/normalize',
		'sass': './frameworks/amd/sass.sync',
		'aui': './frameworks/agile/aui',
    	'agile-ce': './frameworks/agile/agile.ce.browser',// 必须
    	'agile-ui': './frameworks/agile/agile.ui'// 必须
    }
});

require(['aui!./page/Main'], function(){
	document.querySelector('#app').innerHTML = '<aui-main></aui-main>';
});

