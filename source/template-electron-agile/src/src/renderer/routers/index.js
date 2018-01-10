
var router = require('@auicomponents/action').router;

router.add([
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: /\/login.*/,
        component: require('../pages/Login.aui')
    },
    {
        path: /\/main.*/,
        component: require('../pages/Main.aui')
    }
]);

var hash = (location.hash||'/').replace('#', '') || '/login';

router.go(hash);

