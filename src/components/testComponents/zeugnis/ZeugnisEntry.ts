import Schulfach, {AllowedSchulfachByBildungsgang} from "@/components/testComponents/zeugnis/Schulfach.type";
import type Bildungsgang from "@/components/testComponents/zeugnis/Bildungsgang.type";

export default class ZeugnisEntry {
    fach: Schulfach;
    note: number;

    constructor(fach: Schulfach, note: number) {
        this.fach = fach;
        this.note = note;
    }

    public setFach(fach: Schulfach): ZeugnisEntry {
        this.fach = fach;
        return this;
    }

    public setNote(note: number): ZeugnisEntry {
        this.note = note;
        return this;
    }

    static createZeugnisEntryList(existingGrades: ZeugnisEntry[], bildungsgang: Bildungsgang): ZeugnisEntry[] {
        const allowedSchulfaecher = AllowedSchulfachByBildungsgang[bildungsgang];
        const filteredExistingGrades = existingGrades.filter(entry => allowedSchulfaecher.includes(entry.fach));
        const existingGradesSet = new Set(filteredExistingGrades.map(entry => entry.fach));
        const newEntries = allowedSchulfaecher.filter(fach => !existingGradesSet.has(fach)).map(fach => new ZeugnisEntry(fach, 0));
        console.log(...existingGrades,...newEntries);
        return [
            ...filteredExistingGrades,
            ...newEntries
        ]
    }
}