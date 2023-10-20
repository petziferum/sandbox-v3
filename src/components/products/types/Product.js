export default class Product {
  productNumber = String;
  productName;
  statusChanges = new Array();

  constructor(productNumber, productName) {
    this._productNumber = productNumber;
    this._productName = productName;
  }

  withStatus(status) {
    this.statusChanges.push(status);
  }
  static createEmptyProduct() {
    return new Product(undefined, undefined, undefined);
  }


  get productNumber() {
    return this._productNumber;
  }

  set productNumber(value) {
    this._productNumber = value;
  }

  get productName() {
    return this._productName;
  }

  set productName(value) {
    this._productName = value;
  }
}
