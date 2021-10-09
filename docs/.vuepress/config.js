module.exports = {
    title: 'BlaxBerry',
    description: "Chen's Program Study Note",
    // logo: '/logo.jpg',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
            { text: 'Portfolio', link: 'https://blaxberry.github.io/' },
            { text: 'Github', link: 'https://github.com/BlaxBerry/vuepress-studynotes' },
        ],
        sidebar: 'auto',
        sidebarDepth: 4,
        displayAllHeaders: true,
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