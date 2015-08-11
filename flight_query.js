
if (Meteor.isClient) {
    Template.flight_query.helpers({
        air_lines: [
            {
                key: "1",
                name: "羽田"
            },
            {
                key: "2",
                name: "成田"
            },
            {
                key: "3",
                name: "福岡"
            },
            {
                key: "4",
                name: "千歳"
            },
        ]
    });
}