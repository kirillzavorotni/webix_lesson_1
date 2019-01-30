webix.ready(function(){
  const firstRow = {
    cols: [
      { 
        view: 'label',
        label: 'My App',
        css: 'custom-label-style',
        width: 75,
      },
      { view: 'spacer' },
      {
        view: 'button',
        type: 'icon',
        icon: 'mdi mdi-account',
        id: 'profile',
        label: 'Profile',
        width: 90,
        css: 'transparent_button',
      },
    ],
    css: 'first_row',
    height: 40,
  };

  webix.ui({
      view: 'layout',
      rows: [
        firstRow,
        {},
        {},
      ],
  });
});
