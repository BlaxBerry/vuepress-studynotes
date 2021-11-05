module.exports = {
    title: 'BlaxBerry',
    description: "Chen's Program Study Note",
    base: '/vuepress-studynotes/',
    themeConfig: {
        logo: '/logo.jpg',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Catalog', link: '/guide/' },
            {
                text: 'Hot', items: [
                    {
                        text: 'Front-End',
                        items: [
                            { text: 'JavaScript', link: '/notes/Javascript/' },
                            { text: 'Vue.js', link: '/notes/Vue/' },
                            { text: 'React.js', link: '/notes/React/' },
                        ]
                    },
                    {
                        text: 'Server-Side',
                        items: [
                            { text: 'Node.js', link: '/notes/Nodejs/' },
                        ]
                    },
                ]
            },
            { text: 'Portfolio', link: 'https://blaxberry.github.io/' },
            { text: 'Github', link: 'https://github.com/BlaxBerry/vuepress-studynotes' },
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