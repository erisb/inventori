module.exports = {
    useFileSystemPublicRoutes: false,
    devIndicators: {
        autoPrerender: process.env.NEXT_PUBLIC_ENV == 'development' ? true : false,
        buildActivity: process.env.NEXT_PUBLIC_ENV == 'development' ? true : false,
    }
}