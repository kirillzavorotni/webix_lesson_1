webix.ready(function () {
  const filmCategoriesCollection = new webix.DataCollection({
    url: "http://localhost/xb_software/study/lesson_1_practice/data/categories.js",
  });

  const usersCollection = new webix.DataCollection({
    url: "http://localhost/xb_software/study/lesson_1_practice/data/users.js",
  });

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
        data: ['Dashboard', 'Users', 'Product', 'Admin'],
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
            rows: [
              {
                view: 'tabbar',
                id: 'datefilter',
                options: [
                  { id: 1, value: "All" },
                  { id: 2, value: "Old" },
                  { id: 3, value: "Modern" },
                  { id: 4, value: "New" },
                ],
                on: {
                  'onChange': function () {
                    $$('film_list').filterByAll();
                  }
                }
              },
              {
                view: 'datatable',
                editable: true,
                id: 'film_list',
                autoConfig: true,
                hover: 'rowhover',
                scheme: {
                  $init: function (obj) {
                    if (obj.id % 2) {
                      obj.categoryId = '3';
                    } else {
                      obj.categoryId = '4';
                    }

                    obj.rating = parseFloat(obj.rating.replace(',', '.'));
                    obj.votes = parseFloat(obj.votes.replace(',', '.'));
                  },
                },
                columns: [
                  {
                    id: 'id', header: [{ text: '', }], width: 40, css: {
                      'background-color': 'rgb(244, 245, 249)',
                    },
                    sort: 'int',
                  },
                  { id: 'title', header: ['Title', { content: 'textFilter' }], sort: 'string', fillspace: true, },
                  { id: 'categoryId', header: ['Category', { content: 'selectFilter' }], collection: filmCategoriesCollection },
                  { id: 'votes', header: ['Votes', { content: 'textFilter', compare: startCompare }], sort: 'int' },
                  { id: 'rating', header: ['Rating', { content: 'textFilter', compare: startCompare }], sort: 'string', },
                  { id: 'rank', header: ['Rank', { content: 'numberFilter' }], sort: 'int' },
                  { id: 'year', header: ['Year'], sort: 'int', },
                  { template: '<span class="removeElement webix_icon wxi-trash"></span>' },
                ],
                select: 'row',
                url: 'http://localhost/xb_software/study/lesson_1_practice/data/data.js',
                onClick: {
                  'removeElement': function (e, id) {
                    this.remove(id);
                    return false;
                  },
                },
              },
            ]
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
              { view: 'richselect', name: 'categoryId', label: "Categories", options: filmCategoriesCollection },
              {
                cols: [
                  {
                    view: 'button',
                    id: 'add_item',
                    value: 'Add new',
                    type: 'form',
                    click: function () {
                      const form = $$('addElements');
                      if (form.validate()) {
                        const values = $$('addElements').getValues();
                        if (values.id) {
                          form.save();
                          webix.message({ text: 'Successful update' });
                        } else {
                          form.save();
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
                return value < 100000;
              },
              rating: function (value) {
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
              {
                view: 'button', type: 'form', label: 'Add new', width: 110,
                click: function () {
                  const names = ['Kirill Zavorotny', 'Olga Melichova', 'Andrew Braim', 'Vladimir Mucha'];
                  const ages = [28, 32, 19, 25];
                  const countries = ['Minsk', 'Mohilev', 'Orsha', 'Tumen'];
                  const randomeValue = Math.floor(Math.random() * 4);
                  const item = {
                    name: names[randomeValue],
                    age: ages[randomeValue],
                    country: countries[randomeValue],
                  };
                  $$('userlist').add(item);
                },
              },
            ],
          },
          {
            view: 'myuserlist',
            id: 'userlist',
            height: 210,
            multiselect: true,
            editable: true,
            editor: "text",
            editValue: "name",
            template: '#name# from #country# <span class="closelement webix_icon wxi-close"></span>',
            scheme: {
              $init: function (obj) {
                if (obj.age > 26) {
                  obj.$css = 'style_for_age';
                }
              },
            },
            onClick: {
              'closelement': function (e, id) {
                this.remove(id);
                return false;
              },
            },
            rules: {
              name: webix.rules.isNotEmpty,
            },
          },
          {
            view: 'chart',
            id: 'mychart',
            type: 'bar',
            value: '#count#',
            height: 300,
            xAxis: {
              template: "#country#",
              lines: true,
            },
            yAxis: {
              start: 0,
              step: 1,
              end: 5,
            },
          },
          { view: 'spacer' },
        ],
        id: 'Users',
      },
      {
        view: "treetable",
        id: 'Product',
        select: 'cell',
        editable: true,
        columns: [
          { id: 'id', header: '', width: 40 },
          { id: 'title', header: 'Title', template: '{common.treetable()} #title#', editor: "text", width: 350 },
          { id: 'price', header: 'Price', fillspace: true, editor: "text" },
        ],
        rules: {
          title: webix.rules.isNotEmpty,
          price: function (value) {
            if (!value || value == 0) {
              return false;
            }
            return true;
          },
        },
      },
      {
        rows: [
          {
            view: 'datatable',
            editable: true,
            id: 'categoriesdtable',
            columns: [
              { id: 'value', header: 'Categories', fillspace: true, editor: 'text' },
              { template: '<span class="removeElement webix_icon wxi-trash"></span>' },
            ],
            onClick: {
              'removeElement': function (e, id) {
                filmCategoriesCollection.remove(id);
                return false;

              },
            },
          },
          {
            cols: [
              {
                view: 'button', label: 'Add new', type: 'form',
                click: function (id) {
                  filmCategoriesCollection.add({ "value": "Some Categories" });
                },
              },
            ],
          },
        ],
        id: 'Admin',
      },
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

  webix.protoUI({
    name: "myuserlist",
  }, webix.EditAbility, webix.ui.list);

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

  $$("categoriesdtable").sync(filmCategoriesCollection);
  $$("userlist").sync(usersCollection);
  $$("mychart").sync(usersCollection);
  

  $$('addElements').bind($$('film_list'));

  function startCompare(value, filter) {
    value = value.toString();
    filter = filter.toString();
    return value.indexOf(filter) === 0;
  };

  $$('list_input').attachEvent('onTimedKeyPress', function () {
    const value = this.getValue().toLowerCase();
    $$('userList').filter('#name#', value);
  });

  $$('Product').load('http://localhost/xb_software/study/lesson_1_practice/data/products.js', function () {
    this.openAll();
  });

  function sort_asc() {
    $$('userlist').sort('#age#', 'asc');
  }

  function sort_desc() {
    $$('userlist').sort('#age#', 'desc');
  }

  $$('film_list').registerFilter(
    $$('datefilter'),
    {
      columnId: 'year',
      compare: function (value, filter, item) {
        if (filter == 1) {
          return true;
        } else if (filter == 2) {
          return value <= 1980;
        } else if (filter == 3) {
          return value < 2010 && value > 1980;
        } else {
          return value >= 2010;
        }
      },
    },
    {
      getValue: function (node) {
        return node.getValue();
      },
      setValue: function (node, value) {
        node.setValue(value);
      }
    }
  );

  $$("mychart").sync(
    $$("userlist"),
    function () {
      this.group({
        by: "country",
        map: {
          count: ["country", "count"],
        }
      });
    }
  );
});
