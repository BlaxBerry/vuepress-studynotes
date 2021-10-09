module.exports = {
    title: 'BlaxBerry',
    description: "Chen's Program Study Note",
    logo: '/public/logo.jpg',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
            { text: 'Portfolio', link: 'https://blaxberry.github.io/' },
            { text: 'Github', link: 'https://github.com/BlaxBerry/vuepress-studynotes' },
        ],
        sidebar: 'auto',
        sidebarDepth: 3,
        displayAllHeaders: true,
        activeHeaderLinks: true,
        lastUpdated: 'Last Updated', // string | boolean
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