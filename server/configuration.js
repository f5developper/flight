if (typeof Meteor.settings === 'undefined')
    Meteor.settings = {};

_.defaults(Meteor.settings, {
    google: {
        consumerKey: "559535785491-17vakl4ljhm0v3nhquennobd7e100r2h.apps.googleusercontent.com",
        secret: "1-BzPFYl3_lYqeHYXMi2EDSo"
    }
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
