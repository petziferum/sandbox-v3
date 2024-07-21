import type {Schulfach} from "@/components/testComponents/zeugnis/Schulfach.type";

export default class ZeugnisEntry {
    private fach: Schulfach;
    private note: number;

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
}