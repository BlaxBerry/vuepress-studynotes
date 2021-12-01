module.exports = {
    title: 'BlaxBerry',
    description: "Chen's Program Study Note",
    base: '/vuepress-studynotes/',
    themeConfig: {
        logo: '/logo.jpg',
        nav: [
            { text: '目录列表', link: '/guide/' },
            { text: 'JavaScript', link: '/notes/JavaScript/' },
            { text: 'React.js', link: '/notes/React/' },
            { text: 'Vue.js', link: '/notes/Vue/' },
        ],
        sidebar: 'auto',
        collapsable: true,
        activeHeaderLinks: true,
        lastUpdated: 'Last Updated',
        nextLinks: true,
        prevLinks: true,
        smoothScroll: true
    },
    plugins: [
        '@vuepress/active-header-links',
        '@vuepress/back-to-top',
        '@vuepress/nprogress',
        [
            '@vuepress/google-analytics',
            {
                'ga': '' // UA-00000000-0
            }
        ]

    ]
}