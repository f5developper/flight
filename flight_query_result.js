
//Flight_info = new Mongo.Collection("flight_info");
if (Meteor.isClient) {

    // This code only runs on the client
    Template.flight_query_result.helpers({
        flights: function () {
            if (Session.get("leavedFrom") || Session.get("arrivalTo") || Session.get("leavedAt")) {
                var query = {};

                if (Session.get("leavedFrom")) {
                    query['leavedFrom'] = Session.get("leavedFrom");
                }

                if (Session.get("arrivalTo")) {
                    query['arrivalTo'] = Session.get("arrivalTo");
                }
                if (Session.get("leavedAt")) {
                    var from = moment(Session.get("leavedAt"),'YYYY/MM/DD');
                    var to = moment(Session.get("leavedAt"),'YYYY/MM/DD').add(1,'days');
                    query['leavedAt'] = {"$gte":from.toDate(),"$lt":to.toDate()};
                }

                console.log(query);
                return Flight_info.find(query);
            } else {
                return Flight_info.find();
            }

        }
    });
}
