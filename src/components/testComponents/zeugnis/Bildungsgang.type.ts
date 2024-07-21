enum Bildungsgang{
    "SOZIAL" = "Sozial",
    "NATURWISSENSCHAFTLICH" = "Naturwissenschaftlich",
    "TECHNISCH" = "Technisch",
    "WIRTSCHAFT" = "Wirtschaft",
    "SPRACHLICH" = "Sprachlich",
    "KUNST" = "Kunst",
    "SPORT" = "Sport",
}

const BildungsgangToDescription = new Map<string, string> ([
    [Bildungsgang.SOZIAL, "Sozialwissenschaftlicher Zweig"],
    [Bildungsgang.NATURWISSENSCHAFTLICH, "Naturwissenschaftlicher Zweig"],
    [Bildungsgang.TECHNISCH, "Technischer Zweig"],
    [Bildungsgang.WIRTSCHAFT, "Wirtschaftwissenschaftlicher Zweig"],
    [Bildungsgang.SPRACHLICH, "Sprachwissenschaftlicher Zweig"],
    [Bildungsgang.KUNST, "Kunst und Musik"],
    [Bildungsgang.SPORT, "Sportlicher Zweig"],
]);

const BildungsgangAsRecord: Record<string, string>[] = Object.values(Bildungsgang).map((key) => {
    return { text: BildungsgangToDescription.get(key) as string, value: key };
});

export default Bildungsgang;