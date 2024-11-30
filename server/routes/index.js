const express = require("express");
const authRouter = require('./auth.routes');
const blogRouter = require('./blog.routes');

const router = express.Router();

const defaultRouter = [
    {
        path: '/auth',
        route: authRouter,
    },
    {
        path: '/blog',
        route: blogRouter,
    }
]

defaultRouter.forEach(route => {
    router.use(route.path, route.route);
})

module.exports = router;