import ProductStatus from "./ProductStatus";

export default class StatusChanges {
  status = ProductStatus;
  changeDate = Date;

  constructor(status = ProductStatus, changeDate = Date) {
    this.status = status;
    this.changeDate = changeDate;
  }

  withStatus(value) {
    this.status = value;
    return this;
  }
  withChangeDate(value) {
    this.changeDate = value;
    return this;
  }
  static createEmptyStatusChanges() {
    return new StatusChanges(undefined, undefined);
  }
}
