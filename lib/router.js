Router.configure({
    layoutTemplate: 'app_body'
});

Router.route('/', function () {
  this.render('flight_query');
});

Router.route('/my_page', function () {
  this.render('my_page');
});
