//サーバ側でpublishしたキー名でコレクションを生成する。メテオはクライアントにも同一コレクションをもっているためこうやるとローカルのコレクションにアクセスできる
aggregateLowerPrice = new Mongo.Collection("aggregateLowerPrice");

// This code only runs on the client
Template.flight_query_result.helpers({
    flights: function () {
        if (Session.get("leavedFrom") || Session.get("arrivalTo") || Session.get("leavedAt")) {
            Meteor.subscribe("aggregateLowerPrice", Session.get("leavedFrom"), Session.get("arrivalTo"), Session.get("leavedAt"));
            console.log(aggregateLowerPrice.find());
            return aggregateLowerPrice.find();
        }

    }
});
