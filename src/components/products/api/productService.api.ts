import FetchUtils from "@/api/FetchUtils";

export default class ProductServiceApi {

    private static base = "/products";

    static getAllProducts() {
        return fetch(`${this.base}`, FetchUtils.getGETConfig())
            .then(async response => {
                await FetchUtils.defaultResponseHandler(response);
                return response.json();
            });
    }
}