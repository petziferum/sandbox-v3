import Bildungsgang from "@/components/testComponents/zeugnis/Bildungsgang.type";

enum Schulfach {
    MATHE = "Mathe",
    DEUTSCH = "Deutsch",
    MOTORRADFAHREN = "Motorradfahren",
    ENGLISCH = "Englisch",
    GESCHICHTE = "Geschichte",
    BIOLOGIE = "Biologie",
    CHEMIE = "Chemie",
    PHYSIK = "Physik",
    SPORT = "Sport",
    MUSIK = "Musik",
    KUNST = "Kunst",
    RELIGION = "Religion",
    ETHIK = "Ethik",
    INFORMATIK = "Informatik",
    SOZIALKUNDE = "Sozialkunde",
    WIRTSCHAFT = "Wirtschaft",
    POLITIK = "Politik",
    GEOGRAFIE = "Geografie",
    PHILOSOPHIE = "Philosophie",
    LATEIN = "Latein",
    FRANZOESISCH = "Französisch",
    ITALIENISCH = "Italienisch",
    MECHATRONIK = "Mechatronik",
    TECHNIK = "Technik",
}

export const AllowedSchulfachByBildungsgang: Record<Bildungsgang, Schulfach[]> = {
    [Bildungsgang.SOZIAL]: [Schulfach.DEUTSCH, Schulfach.ENGLISCH],
    [Bildungsgang.NATURWISSENSCHAFTLICH]: [Schulfach.MATHE, Schulfach.ENGLISCH],
    [Bildungsgang.TECHNISCH]: [Schulfach.MATHE, Schulfach.MOTORRADFAHREN]
};


export default Schulfach;