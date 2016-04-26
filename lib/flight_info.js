Flight_info = new Mongo.Collection("flight_info");
if (Meteor.isServer) {
    Meteor.publish('flight_info', function () {
        return Flight_info.find();
    });
    Meteor.publish('aggregateLowerPrice', function (leavedFrom, arrivalTo, flightDate) {
        var from = moment(flightDate,'YYYY-MM-DD').startOf('day').add(9,'h');
        var to = moment(flightDate, 'YYYY-MM-DD').endOf('day').add(9,'h');
        var self = this

        var lowerFlights = Flight_info.aggregate([
            {$match: {"leavedFrom": leavedFrom, "arrivalTo": arrivalTo, "leavedAt": {"$gte": from.toDate(), "$lt": to.toDate()}}},
            {$project: {flightId: 1, amount: 1, createdAt: 1}},
            {$unwind: "$amount"},
            {$group: {_id: "$flightId", createdAt: {$max: "$createdAt"}, lowerPrice: {$min: "$amount.amount"}}},
            {$sort: {lowerPrice: 1}}
        ]);

        console.log(lowerFlights);
        lowerFlights.forEach(function (lowerFlight, key) {

            if (!Flight_info.findOne({flightId: lowerFlight.flightId, createdAt: lowerFlight.createdAt})) {
                self.added('aggregateLowerPrice', Random.id(), {
                    "createdAt": "2016-04-25T14:47:38.923Z",
                    "updateAt": "",
                    "flightId": "MM101",
                    "airlineCompanyCd": "",
                    "airlineCompanyName": "ピーチ",
                    "leavedFrom": "KIX",
                    "leavedFromName": "大阪（関西）\n出発",
                    "leavedAt": "2016-06-29T22:10:00.000Z",
                    "arrivalTo": "CTS",
                    "arrivalToName": "札幌（新千歳）\n到着",
                    "arrivalAt": "2016-06-30T00:05:00.000Z",
                    "flightPlan": "片道",
                    "vacancyStatus": "",
                    "amount": [
                        {
                            "key": "ハッピーピーチ",
                            "amount": 19090
                        },
                        {
                            "key": "ハッピーピーチプラス",
                            "amount": 22890
                        }
                    ],
                    "updatedAt": "2016-04-25T14:47:38.923Z"
                });
            }
        });

    });

}