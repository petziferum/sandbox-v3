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

    public addStrength(value: number): void {
        this.strength += value;
    }

}
