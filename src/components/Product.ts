export default class Product {

    id: string;
    name: string;
    description: string;
    price: number;

    constructor(id?: string, name?: string, description?: string, price?: number) {
        this.id = id || "";
        this.price = price || 0;
        this.description = description || "";
        this.name =  name || "";
    }
    static createEmptyProduct(): Product {
        return new Product();
    }

}