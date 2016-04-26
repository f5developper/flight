Template.app_body.helpers({
    newly_notice: function () {
        return Notification.find({shown: '0'}).count();
    }

});
Template.app_body.events({
    'click #my_page': function (event) {
        if (Meteor.user() === null) {
            event.preventDefault();
            Meteor.loginWithGoogle();
        }
    }
});
Template.app_body.rendered = function(){
    $.material.init();
}
