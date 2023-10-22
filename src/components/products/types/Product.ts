export default class Product {

  productNumber: number;
  productName: string;
  description: string;
  price: number;
  statusChanges: string[] = [];

  constructor(productNumber, productName, description, price) {
    this.productNumber = productNumber;
    this.productName = productName;
    this.description = description;
    this.price = price;
  }

  withStatus(status: string) {
    this.statusChanges.push(status);
  }
  static createEmptyProduct() {
    return new Product(0, "", "", 0);
  }
}
