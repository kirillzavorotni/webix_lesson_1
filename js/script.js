webix.ready(function () {
  const small_film_set = [
    { id: 1, title: "The Shawshank Redemption", year: 1994, votes: 678790, rating: 9.2, rank: 1, category: "Thriller" },
    { id: 2, title: "The Godfather", year: 1972, votes: 511495, rating: 9.2, rank: 2, category: "Crime" },
    { id: 3, title: "The Godfather: Part II", year: 1974, votes: 319352, rating: 9.0, rank: 3, category: "Crime" },
    { id: 4, title: "The Good, the Bad and the Ugly", year: 1966, votes: 213030, rating: 8.9, rank: 4, category: "Western" },
    { id: 5, title: "Pulp fiction", year: 1994, votes: 533848, rating: 8.9, rank: 5, category: "Crime" },
    { id: 6, title: "12 Angry Men", year: 1957, votes: 164558, rating: 8.9, rank: 6, category: "Western" },
  ];

  const firstRow = {
    view: 'toolbar',
    css: 'webix_dark',
    cols: [
      {
        view: 'label',
        label: 'My App',
        width: 75,
      },
      { view: 'spacer' },
      {
        view: 'button',
        type: 'icon',
        icon: 'mdi mdi-account',
        id: 'profile',
        label: 'Profile',
        popup: 'profilePopup',
        width: 90,
      },
    ],
    height: 40,
  };

  const secondRow = {
    cols: [
      {
        rows: [
          {
            view: 'list',
            data: ['Dashboard', 'Users', 'Product', 'Locations'],
            width: 180,
            select: true,
            margin: 5,
            scroll: false,
            css: {
              'background-color': '#eee',
              'border-bottom': 'none',
              'background': 'transparent',
            },
          },
          {
            view: 'label',
            label: '<span class="webix_icon mdi mdi-check"></span>Connected',
            css: {
              'color': 'green',
              'text-align': 'center',
            },
          }
        ],
        css: {
          'background-color': '#eee',
        }
      },
      { view: 'resizer' },
      {
        view: 'datatable',
        id: 'film_list',
        autoConfig: true,
        columns: [
          { id: 'title', header: 'Title', fillspace: true },
          { id: 'year', header: 'Year' },
          { id: 'votes', header: 'Votes' },
          { id: 'rating', header: 'Rating' },
          { id: 'rank', header: 'Rank' },
        ],
        select: 'row',
        data: small_film_set,
      },
      {
        view: 'form',
        id: 'addElements',
        elements: [
          { type: 'section', template: 'Edit films' },
          { view: 'text', label: 'Title', name: 'title' },
          { view: 'text', label: 'Year', name: 'year' },
          { view: 'text', label: 'Rating', name: 'rating' },
          { view: 'text', label: 'Votes', name: 'votes' },
          {
            cols: [
              {
                view: 'button',
                value: 'Add new',
                type: 'form',
                click: function() {
                  const values = $$('addElements').getValues();
                  $$('film_list').add(values);
                },
              },
              { view: 'button', value: 'Clear' },
            ],
            margin: 7,
            width: 280,
          },
          { view: 'spacer' },
        ],
      },
    ],
  };

  const thirdRow = {
    view: 'label',
    label: 'The software is provided by <a href="https://webix.com" target=”_blank”>https://webix.com.</a> All rights reserved (c)',
    css: {
      'text-align': 'center',
    },
  };

  webix.ui({
    view: 'popup',
    id: 'profilePopup',
    width: 280,
    move: false,
    body: {
      view: 'list',
      data: ['Settings', 'Log out'],
      autoheight: true,
      select: true,
    },
  });

  webix.ui({
    view: 'layout',
    id: 'myApp',
    rows: [
      firstRow,
      secondRow,
      thirdRow,
    ],
  });
});
