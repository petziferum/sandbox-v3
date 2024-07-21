import Schulfach from "@/components/testComponents/zeugnis/Schulfach.type";

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

    static createZeugnisEntryList(existingGrades: ZeugnisEntry[]): ZeugnisEntry[] {
        const entryValues: Schulfach[] = Object.values(Schulfach) as Schulfach[];
        const existingGradesSet = new Set(existingGrades.map(entry => entry.fach));

        return [
            ...existingGrades,
            ...entryValues.filter(fach => !existingGradesSet.has(fach)).map(fach => new ZeugnisEntry(fach, 0))
        ]
    }
}