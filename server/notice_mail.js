Meteor.startup(function () {

    var noticeAmount = function () {
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

            var tmpl = SSR.compileTemplate('emailText', Assets.getText('notice.txt'));
            parameters.text = tmpl.renderFunction();
            (function (parameters) {
                Email.send(parameters);
                Notification.update(
                        {userId: notice.userId}, {isNotice: '0'}
                );
            })(parameters);
        });
    }

    var cron = new Meteor.Cron({
        events: {
//分　時　日　月　曜日
            "* * * * *": noticeAmount
        }
    });
});