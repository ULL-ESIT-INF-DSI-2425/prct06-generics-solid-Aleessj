/**
 * El código inicial viola el Principio de Sustitución de Liskov.
 */

export interface IFly {
  fly(): void;
}

export class Bird {
  constructor(public name: string) {}

  eat(): void { console.log(`${this.name} is eating...`); }
}

export class Sparrow extends Bird implements IFly {
  fly(): void { console.log(`${this.name} is flying...`); }
}

export class Penguin extends Bird {
  swim(): void { console.log(`${this.name} is swimming...`); }
}

const sparrow = new Sparrow("Sparrow");
sparrow.eat();
sparrow.fly(); 

const penguin = new Penguin("Penguin");
penguin.eat();
penguin.swim();