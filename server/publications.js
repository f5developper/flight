
Meteor.publish('flight_info', function () {
    return Flight_info.find();
});
Meteor.publish('aggregateLowerPrice', function (leavedFrom, arrivalTo, flightDate) {
    var from = moment(flightDate, 'YYYY-MM-DD').startOf('day');
    var to = moment(flightDate, 'YYYY-MM-DD').endOf('day');
    var self = this;
    var lowerFlights = Flight_info.aggregate([
        {$match: {"leavedFrom": leavedFrom, "arrivalTo": arrivalTo, "leavedAt": {"$gte": from.toDate(), "$lt": to.toDate()}}},
        {$project: {flightId: 1, amount: 1, createdAt: 1}},
        {$unwind: "$amount"},
        {$group: {_id: "$flightId", createdAt: {$max: "$createdAt"}, lowerPrice: {$min: "$amount.amount"}}},
        {$sort: {lowerPrice: 1}}
    ]);

    lowerFlights.forEach(function (lowerFlight, key) {
        self.added('aggregateLowerPrice', Random.id(), Flight_info.findOne({flightId: lowerFlight._id, createdAt: lowerFlight.createdAt, "amount.amount": lowerFlight.lowerPrice}));
    });

});

Meteor.publish('air_lines', function () {
    return Air_lines.find({}, {sort: {priority: -1}});
});


Meteor.publish('notification', function () {
    return Notification.find();
});
