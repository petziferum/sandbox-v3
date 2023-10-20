const productStatus = {
  AVAILABLE: "AVAILABLE",
  UNAVAILABLE: "UNAVAILABLE",
  INSTOCK: "INSTOCK",
  ORDER: "ORDER"
};

export const statusToBeschreibung = new Map([
    [productStatus.AVAILABLE, "Verfügbar"],
    [productStatus.UNAVAILABLE, "Nicht verfügbar"],
    [productStatus.INSTOCK, "Auf Lager"],
    [productStatus.ORDER, "In Zulieferung"]
])


export default productStatus;
