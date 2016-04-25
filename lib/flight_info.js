Flight_info = new Mongo.Collection("flight_info");
if (Meteor.isServer) {
    Meteor.publish('flight_info', function () {
        return Flight_info.find();
    });
    Meteor.publish('aggregateLowerPrice', function () {
        return Flight_info.aggregate([
            {$match: {"leavedAt": {"$gte": ISODate("2016-04-24")}}},
            {$project: {flightId: 1, amount: 1, createdAt: 1}},
            {$unwind: "$amount"},
            {$group: {_id: "$flightId", createdAt: {$max: "$createdAt"}, lowerPrice: {$min: "$amount.amount"}}},
            {$sort: {lowerPrice: 1}}
        ]);

    });

}