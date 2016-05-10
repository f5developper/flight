Router.configure({
    layoutTemplate: 'contents'
});

Router.route('/', function () {
  this.render('index');
});

Router.route('/my_page', function () {
  this.render('my_page');
});
