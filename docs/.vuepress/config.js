module.exports = {
    title: 'BlaxBerry',
    description: "Chen's Program Study Note",
    base: '/vuepress-studynotes/',
    themeConfig: {
        logo: '/logo.jpg',
        nav: [
            { text: 'JavaScript', link: '/notes/front/JavaScript/' },
            { text: 'React.js', link: '/notes/front/React/' },
            { text: 'Vue.js', link: '/notes/front/Vue/' },
            { text: '前端目录', link: '/guide/front/' },
            { text: '后端目录', link: '/guide/back/' },
            // {
            //     text: '前端目录',
            //     items: [
            //         { text: '三大基础', link: '/guide/front.md#前端基础' },
            //         { text: '前端框架', link: '/guide/front.md#前端框架' },
            //         { text: '服务器渲染', link: '/guide/front.md#服务器渲染' },
            //         { text: '静态站点', link: '/guide/front.md#静态站点生成器' },
            //         { text: '网络知识', link: '/guide/front.md#网络知识' },
            //         { text: '构建工具', link: '/guide/front.md#构建工具' },
            //     ]
            // },
            // {
            //     text: '后端目录',
            //     items: [
            //         { text: '数据库', link: '/guide/back.md#数据库' },
            //         { text: 'Node.js', link: '/guide/back.md#node-js' },
            //         { text: 'Ruby', link: '/guide/back.md#ruby' },
            //         { text: 'Python', link: '/guide/back.md#python' },

            //     ]
            // },
        ],
        sidebar: 'auto',
        lastUpdated: 'Last Updated',
        smoothScroll: true
    },
    plugins: [
        '@vuepress/active-header-links',
        '@vuepress/back-to-top',
        '@vuepress/nprogress',
        // [
        //     '@vuepress/google-analytics',
        //     {
        //         'ga': '' // UA-00000000-0
        //     }
        // ]
    ]
}