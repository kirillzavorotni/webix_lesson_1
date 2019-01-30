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

  const secondRow = {
    cols: [
      {
        rows: [
          { view: 'button', id: 'dashboard', label: 'Dashboard' },
          { view: 'button', id: 'users', label: 'Users' },
          { view: 'button', id: 'product', label: 'Product' },
          { view: 'button', id: 'locations', label: 'Locations' },
          { view: 'spacer' },
          { view: 'label', label: 'Connected', css: 'label_connect' },
        ],
        width: 180,
        margin: 5,
        css: 'gray_col',
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
        id: 'some_form',
        elements: [
          { type: 'section', template: 'Edit films' },
          { view: 'text', label: 'Title' },
          { view: 'text', label: 'Year' },
          { view: 'text', label: 'Rating' },
          { view: 'text', label: 'Votes' },
          {
            cols: [
              { view: 'button', value: 'Add new', css: 'custom_button_form' },
              { view: 'button', value: 'Clear' },
            ],
            margin: 7,
            width: 279,
          },
          { view: 'spacer' },
        ],
      },
    ],
  };

  const thirdRow = {
    template: 'row-3',
    height: 40,
  };

  webix.ui({
    view: 'layout',
    rows: [
      firstRow,
      secondRow,
      thirdRow,
    ],
  });
});
