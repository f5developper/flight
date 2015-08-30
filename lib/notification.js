Notification = new Mongo.Collection("notification");
if (Meteor.isServer) {

    Meteor.publish('notification', function () {
        return Notification.find();
    });

    Notification.allow({insert: function (userId, doc) {
            return true;
        }});
}