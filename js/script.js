webix.ready(function () {
  const small_film_set = [
    { id: 1, title: "The Shawshank Redemption", year: 1994, votes: 678790, rating: 9.2, rank: 1, category: "Thriller" },
    { id: 2, title: "The Godfather", year: 1972, votes: 511495, rating: 9.2, rank: 2, category: "Crime" },
    { id: 3, title: "The Godfather: Part II", year: 1974, votes: 319352, rating: 9.0, rank: 3, category: "Crime" },
    { id: 4, title: "The Good, the Bad and the Ugly", year: 1966, votes: 213030, rating: 8.9, rank: 4, category: "Western" },
    { id: 5, title: "Pulp fiction", year: 1994, votes: 533848, rating: 8.9, rank: 5, category: "Crime" },
    { id: 6, title: "12 Angry Men", year: 1957, votes: 164558, rating: 8.9, rank: 6, category: "Western" },
  ];

  // first row
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
  // first row

  // second row
  const leftList = {
    rows: [
      {
        view: 'list',
        data: ['Dashboard', 'Users', 'Product', 'Locations'],
        on: {
          'onAfterSelect': function (id) {
            $$(id).show();
          }
        },
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
  };

  const multiview = {
    view: 'multiview',
    cells: [
      {
        id: 'Dashboard',
        cols: [
          {
            view: 'datatable',
            editable: true,
            id: 'film_list',
            autoConfig: true,
            hover: 'rowhover',
            columns: [
              {
                id: 'id', header: [{ text: '', }], width: 40, css: {
                  'background-color': 'rgb(244, 245, 249)',
                }
              },
              { id: 'title', header: ['Title', { content: 'textFilter' }], sort: 'string', fillspace: true },
              { id: 'year', header: ['Year', { content: 'numberFilter' }] },
              { id: 'votes', header: ['Votes', { content: 'textFilter', compare: startCompare }] },
              { id: 'rating', header: ['Rating', { content: 'textFilter', compare: startCompare }] },
              { id: 'rank', header: ['Rank', { content: 'numberFilter' }] },
              { template: '<span class="removeElement webix_icon wxi-trash"></span>' },
            ],
            select: 'row',
            url: 'http://localhost/xb_software/study/lesson_1_practice/data/data.js',
            on: {
              'onAfterSelect': function (selection) {
                const elem = $$('film_list').getItem(selection.id);
                $$('addElements').setValues(elem);
              },
            },
            onClick: {
              'removeElement': function (e, id) {
                this.remove(id);
                return false;
              },
            },
          },
          {
            view: 'form',
            id: 'addElements',
            elements: [
              { type: 'section', template: 'Edit films' },
              { view: 'text', label: 'Title', name: 'title', invalidMessage: 'must be filled in' },
              { view: 'text', label: 'Year', name: 'year', invalidMessage: 'between 1970 and current' },
              { view: 'text', label: 'Rating', name: 'rating', invalidMessage: 'cannot be empty or 0' },
              { view: 'text', label: 'Votes', name: 'votes', invalidMessage: 'must be less than 100000' },
              {
                cols: [
                  {
                    view: 'button',
                    value: 'Add new',
                    type: 'form',
                    click: function () {
                      if ($$("addElements").validate()) {
                        const values = $$('addElements').getValues();
                        if (values.id) {
                          $$("film_list").updateItem(values.id, values);
                        } else {
                          $$('film_list').add(values);
                          webix.message({ text: 'Data is correct' });
                        }
                      }
                    },
                  },
                  {
                    view: 'button',
                    value: 'Clear',
                    click: function () {
                      webix.confirm({
                        id: 'confirmClear',
                        text: "Are You shure?",
                        callback: function (result) {
                          if (result) {
                            $$('addElements').clear();
                            $$("addElements").clearValidation();
                          }
                        },
                      });
                    },
                  },
                ],
                margin: 7,
                width: 280,
              },
              { view: 'spacer' },
            ],
            rules: {
              title: webix.rules.isNotEmpty,
              year: function (value) {
                return value >= 1970 && value <= new Date().getFullYear();
              },
              votes: function (value) {
                value = parseFloat(value.replace(',', '.'));
                return value < 100000;
              },
              rating: function (value) {
                value = parseFloat(value.replace(',', '.'));
                return value > 0;
              }
            },
          },
        ],
      },
      {
        rows: [
          {
            view: 'toolbar',
            elements: [
              { view: 'text', id: 'list_input' },
              { view: 'button', type: 'form', label: 'Sort asc', width: 110, click: sort_asc, },
              { view: 'button', type: 'form', label: 'Sort desc', width: 110, click: sort_desc, },
            ],
          },
          {
            view: 'list',
            id: 'userlist',
            css: 'userlist_custom',
            height: 210,
            select: true,
            // url: 'http://localhost/xb_software/study/lesson_1_practice/data/users.js',
            template: '#name# from #country# <span class="closelement webix_icon wxi-close"></span>',
            onClick: {
              'closelement': function (e, id) {
                this.remove(id);
                return false;
              },
            },
          },
          {
            view: 'chart',
            type: 'bar',
            value: '#age#',
            url: 'http://localhost/xb_software/study/lesson_1_practice/data/users.js',
            height: 300,
            xAxis: {
              title: "Age",
              template: "#age#",
              lines: true,
            },
          },
          { view: 'spacer' },
        ],
        id: 'Users',
      },
      { template: 'Products view', id: 'Product' },
      { template: 'Admin view', id: 'Locations' },
    ],
  };

  const secondRow = {
    cols: [
      leftList,
      { view: 'resizer' },
      multiview,
    ],
  };
  // second row

  // third row
  const thirdRow = {
    view: 'label',
    label: 'The software is provided by <a href="https://webix.com" target=”_blank”>https://webix.com.</a> All rights reserved (c)',
    css: {
      'text-align': 'center',
    },
  };
  // third row

  // popup window
  webix.ui({
    view: 'popup',
    id: 'profilePopup',
    width: 280,
    body: {
      view: 'list',
      data: ['Settings', 'Log out'],
      autoheight: true,
      select: true,
    },
  });

  // entry point
  webix.ui({
    view: 'layout',
    id: 'myApp',
    rows: [
      firstRow,
      secondRow,
      thirdRow,
    ],
  });

  function startCompare(value, filter) {
    value = value.toString();
    filter = filter.toString();
    return value.indexOf(filter) === 0;
  };

  $$('list_input').attachEvent('onTimedKeyPress', function () {
    const value = this.getValue().toLowerCase();
    $$('userList').filter('#name#', value);
  });

  $$('userlist').load('http://localhost/xb_software/study/lesson_1_practice/data/users.js', function(){
    $$('userlist').select([1, 2, 3, 4, 5]);
  });

  function sort_asc() {
    $$('userlist').sort('#age#', 'asc' );
  }

  function sort_desc() {
    $$('userlist').sort('#age#', 'desc' );
  }
});
