// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-home",
    title: "Home",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-accepted-papers",
          title: "Accepted Papers",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/papers/";
          },
        },{id: "nav-keynote-speech",
          title: "Keynote Speech",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/keynote/";
          },
        },{id: "nav-schedule",
          title: "Schedule",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/schedule/";
          },
        },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
