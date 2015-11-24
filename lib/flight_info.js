Flight_info = new Mongo.Collection("flight_info");
if (Meteor.isServer) {

    Meteor.startup(function () {
        if (Flight_info.find().count() === 0) {
            flight_info_data.forEach(function (flight_info, index) {
                Flight_info.insert(flight_info);
            });
        }



    });
    Meteor.publish('flight_info', function () {
        return Flight_info.find();
    });
}