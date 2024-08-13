export default class Character {
    firstName: string
    lastName: string
    strength: number
    endurance: number
    charisma: number

    constructor(firstName = "", lastName = "", strength = 0, endurance = 0, charisma = 0) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.strength = strength;
        this.endurance = endurance;
        this.charisma = charisma;
    }

    withFirstName(firstName: string): Character {
        this.firstName = firstName;
        return this;
    }

    withLastName(lastName: string): Character {
        this.lastName = lastName;
        return this;
    }

    withStrength(strength: number): Character {
        this.strength = this.validateAttribute(strength);
        return this;
    }

    withEndurance(endurance: number): Character {
        this.endurance = this.validateAttribute(endurance);
        return this;
    }

    withCharisma(charisma: number): Character {
        this.charisma = this.validateAttribute(charisma);
        return this;
    }

    createEmptyCharacter(): Character {
        return new Character();
    }

    public addStrength(value: number): void {
        this.strength = parseFloat((this.strength + value).toFixed());
    }
    public addEndurance(value: number): void {
        this.endurance = parseFloat((this.endurance + value).toFixed());
    }
    public addCharisma(value: number): void {
        this.charisma = parseFloat((this.charisma + value).toFixed());
    }

    private validateAttribute(value: number): number {
        if (value < 0 || value > 999) {
            throw new Error("Value must be between 0 and 999.");
        }
        return Math.round(value * 100) / 100; // Rounds to two decimal places
    }
}
