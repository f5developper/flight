if (typeof Meteor.settings === 'undefined')
    Meteor.settings = {};

_.defaults(Meteor.settings, {
    google: {
        consumerKey: "559535785491-17vakl4ljhm0v3nhquennobd7e100r2h.apps.googleusercontent.com",
        secret: "zvwLqFBHcRvju2cgKWqyIf6L"
    }
});


Meteor.startup(function () {
    process.env.MAIL_URL = "smtp://postmaster%40sandbox27288175dea1468ebe3092572eca7f71.mailgun.org:ghorstworld@smtp.mailgun.org:587";
    var noticeAmount = function () {
        var parameters = {
            from: "silvet2275@gmail.com",
            to: "int_adachi@intworks.co.jp",
            subject: "2月22日の",
        };

        var tmpl = SSR.compileTemplate('emailText', Assets.getText('notice.txt'));
        parameters.text = tmpl.renderFunction();
        (function (parameters) {
            Email.send(parameters);
        })(parameters);

    }

    var cron = new Meteor.Cron({
        events: {
            "* * * * *": noticeAmount
        }
    });

});

ServiceConfiguration.configurations.upsert(
        {service: "google"},
{
    $set: {
        clientId: Meteor.settings.google.consumerKey,
        secret: Meteor.settings.google.secret
    }
}
);
