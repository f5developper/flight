Template.index.helpers({
    newly_notice: function () {
        return Notification.find({shown: '0'}).count();
    }

});
Template.index.events({
    'click #my_page': function (event) {
        if (Meteor.user() === null) {
            event.preventDefault();
            Meteor.loginWithGoogle();
        }
    }
});
