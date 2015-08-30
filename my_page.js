
if (Meteor.isClient) {
    Template.my_page.helpers({
        user_notice: function () {
            return Notification.find({userId: Meteor.userId()});
        }
    });
}