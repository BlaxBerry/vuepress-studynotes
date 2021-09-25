module.exports = {
    title: 'StudyNotes',
    description: 'Program Study Notes',
    themeConfig: {
      smoothScroll: true,
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Guide', link: '/guide/' },
        {
          text: 'Links',
          ariaLabel: 'Links',
          items: [
            { text: 'Github', link: 'https://github.com/BlaxBerry' },
            { text: 'Portfolio', link: 'https://blaxberry.github.io/#/' }
          ]
        }
      ],
      sidebarDepth: 4,
      sidebar: 'auto'
    }
  }