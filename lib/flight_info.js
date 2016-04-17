Flight_info = new Mongo.Collection("flight_info");
if (Meteor.isServer) {
    Meteor.publish('flight_info', function () {
        return Flight_info.find();
    });
}