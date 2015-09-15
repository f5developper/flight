
if (Meteor.isClient) {
    Template.my_page.helpers({
        user_notice: function () {
            return Notification.find({userId: Meteor.userId()});
        }
    });
    Template.my_page.onCreated(function () {
        var notShownNotice = Notification.find({userId: Meteor.userId(), shown: "0"});

        
        notShownNotice.forEach(function (data, index) {
            Notification.update({_id: data._id}, {$set:{shown: "1"}});

        });
    });

}