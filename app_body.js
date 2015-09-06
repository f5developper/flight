if(Meteor.isClient){
    Template.app_body.helpers({
        newly_notice: function () {
            return Notification.find({shown:'0'}).count();
        }

    });
    
}