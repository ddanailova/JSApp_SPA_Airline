const flightModel = function () {

    let flightsUrl = `appdata/${storage.appKey}/flights`;

    const add = function (params) {
        let data = {
            "destination": params.destination,
            "origin": params.origin,
            "departure": params.departureDate,
            "departureTime": params.departureTime,
            "seats": params.seats,
            "cost": params.cost,
            "image": params.img,
            "isPublic": !!params.public
        };
        return requester.post(flightsUrl, data);
    };

    const flights = function (onlyPublic) {
        let publicFlightsUrl = flightsUrl;
        if (onlyPublic) {
            publicFlightsUrl += `?query={"isPublic":true}`;
        }

        return requester.get(publicFlightsUrl);
    };

    const myFlights = function () {
        let myFlightsUrl = flightsUrl;
        let userId = storage.getData('userInfo').id;

        myFlightsUrl += `?query={"_acl.creator":"${userId}"}`;

        return requester.get(myFlightsUrl);
    };

    const details = function (id) {
        let flightDetailUrl = flightsUrl + `/${id}`;
        return requester.get(flightDetailUrl);
    };

    const remove = function (id) {
        let flightRemoveUrl = flightsUrl + `/${id}`;
        return requester.remove(flightRemoveUrl);
    };

    const edit = function (id, params) {
        let flightEditUrl = flightsUrl + `/${id}`;
        let data = {
            "destination": params.destination,
            "origin": params.origin,
            "departure": params.departureDate,
            "departureTime": params.departureTime,
            "seats": params.seats,
            "cost": params.cost,
            "image": params.img,
            "isPublic": !!params.public
        };
        return requester.update(flightEditUrl, data);
    };

    return {
        add,
        flights,
        myFlights,
        details,
        remove,
        edit
    }
}();