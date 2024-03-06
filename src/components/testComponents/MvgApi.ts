

export default class MvgApi {

    apiName ="MVG";
    static query_url_name = "https://www.mvg.de/api/fahrinfo/location/queryWeb?q={name}";
    query_url_id = "https://www.mvg.de/api/fahrinfo/location/query?q={id}";
    static departure_url = "https://www.mvg.de/api/fahrinfo/departure/{id}?footway={offset}";
    nearby_url = "https://www.mvg.de/api/fahrinfo/location/nearby?latitude={lat}&longitude={lon}";
    routing_url = "https://www.mvg.de/api/fahrinfo/routing/?";
    interruptions_url = "https://www.mvg.de/.rest/betriebsaenderungen/api/interruptions";
    id_prefix = "de:09162:";
    static departure_url_cors = "https://cors-anywhere.herokuapp.com/https://www.mvg.de/api/fahrinfo/departure/{id}?footway={offset}";

    public static fetchNextTrain(stationName: string): Promise<any> {
        return fetch(this.departure_url.replace("{name}", stationName))
            .then(response => response.json())
            .then(data => {
                console.log("DATEN", data);
            })
    }



    public static fetchNextTrainCors(stationName: string): Promise<any> {
        return fetch(this.departure_url_cors.replace("{name}", stationName), {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("DATEN", data);
            });
    }
}