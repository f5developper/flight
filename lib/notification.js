Notification = new Mongo.Collection("notification");
if (Meteor.isServer) {
    Notification.allow(
            {
                insert: function (userId, doc) {
                    return true;
                },
                update: function (userId, doc, fields, modifier) {
                    return true;
                }
            });
}

