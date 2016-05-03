Meteor.startup(function () {

    var noticeAmount = function () {
        console.log("aaaa");
        Notification.find({isNotice: '1'}).fetch().forEach(function (notice) {

            var user = Meteor.users.findOne({_id: notice.userId});
            var to = '';

            if (typeof user.services.google !== "undefined") {
                to = user.services.google.email;
            } else {
                to = user.emails[0].address;
            }

            var parameters = {
                from: "silvet2275@gmail.com",
                to: to,
                subject: "航空券の値段に変更がありました",
            };

            SSR.compileTemplate('emailText', Assets.getText('notice.txt'));
            
            var leavedAt = moment(notice.leavedAt);
            parameters.text = SSR.render("emailText",{flightTime:leavedAt.format('YYYY年MM月DD日'),url:Meteor.absoluteUrl()});
            (function (parameters) {
                Email.send(parameters);
                Notification.update(
                        {userId: notice.userId}, {$set: {isNotice: '0'}}
                );
            })(parameters);
        });
    }

    var cron = new Meteor.Cron({
        events: {
//分　時　日　月　曜日
            "*/5 7-22 * * *": noticeAmount
        }
    });
});