enum productStatus  {
  AVAILABLE= "AVAILABLE",
  UNAVAILABLE = "UNAVAILABLE",
  INSTOCK = "INSTOCK",
  ORDER = "ORDER"
};

export const statusToBeschreibung = new Map<string, string>([
    [productStatus.AVAILABLE, "Verfügbar"],
    [productStatus.UNAVAILABLE, "Nicht verfügbar"],
    [productStatus.INSTOCK, "Auf Lager"],
    [productStatus.ORDER, "In Zulieferung"]
])

export const statusAsRecord: Record<string, string>[] = Object.values(productStatus).map((key) => {
    return { text: statusToBeschreibung.get(key) as string, value: key };
});

export default productStatus;