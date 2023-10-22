export enum productStatus  {
  AVAILABLE= "AVAILABLE",
  UNAVAILABLE = "UNAVAILABLE",
  INSTOCK = "INSTOCK",
  ORDER = "ORDER"
};

export const statusToBeschreibung = new Map([
    [productStatus.AVAILABLE, "Verfügbar"],
    [productStatus.UNAVAILABLE, "Nicht verfügbar"],
    [productStatus.INSTOCK, "Auf Lager"],
    [productStatus.ORDER, "In Zulieferung"]
])

export const statusAsRecord: Record<string, string>[] = Object.values(productStatus).map((key: productStatus) => {
    return { text: statusToBeschreibung.get(key), value: key };
});

