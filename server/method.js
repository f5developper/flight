Meteor.methods({
    aggregateLowerPrice (leavedFrom, arrivalTo, flightDate) {
        let from = moment(flightDate, 'YYYY-MM-DD').startOf('day');
        let to = moment(flightDate, 'YYYY-MM-DD').endOf('day');
        let self = this;
        let lowerFlights = Flight_info.aggregate([
            {
                $match: {
                    "leavedFrom": leavedFrom,
                    "arrivalTo": arrivalTo,
                    "leavedAt": {"$gte": from.toDate(), "$lt": to.toDate()}
                }
            },
            {$project: {flightId: 1, amount: 1, createdAt: 1}},
            {$unwind: "$amount"},
            {$group: {_id: "$flightId", createdAt: {$max: "$createdAt"}, lowerPrice: {$min: "$amount.amount"}}},
            {$sort: {lowerPrice: 1,}}]);

        return lowerFlights.map((lowerFlight, key) => {
            let result = Flight_info.findOne({
                flightId: lowerFlight._id,
                createdAt: lowerFlight.createdAt,
                "amount.amount": lowerFlight.lowerPrice
            });
            return result;
        });

    }
});