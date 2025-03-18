/**
 * Interfaz que tiene los métodos add substract multiply y divide
 */
export interface Arithmeticable<T> {
  /**
   * Funcion que suma dos complejos
   * @param value - ComplexNumber
   * @returns La suma de ambos
   */
  add(value: T): T;

  /**
   * Funcion que resta dos complejos
   * @param value - ComplexNumber
   * @returns La resta de ambos
   */
  substract(value: T): T;

  /**
   * Funcion que multiplica dos complejos
   * @param value - ComplexNumber
   * @returns La multiplicacion de ambos
   */
  multiply(value: T): T;
  /**
   * Funcion que divide dos complejos
   * @param value - ComplexNumber
   * @returns La division de ambos
   */
  divide(value: T): T;
}

/**
 * Clase que extiende la interfaz
 */
export class ArithmeticableCollection<T extends Arithmeticable<T>> {
  /**
   * Constructor
   * @param values - Lista de valores tipo T
   */
  constructor(private values: T[]) {}

  /**
   * Añade un valor a lista
   * @param value - T
   */
  addArithmeticable(value: T): void { this.values.push(value); }

  /**
   * Devuelve un valor dada la posicion
   * @param index - Posicion 
   * @returns - T
   */
  getArithmeticable(index: number): T | undefined { return this.values.at(index); }

  /**
   * Funcion que calcula el size de la lista
   * @returns - number (size)
   */
  getNumberOfArithmeticables(): number { return this.values.length; }
} 

export class ComplexNumber implements Arithmeticable<ComplexNumber> {
  constructor(private real_: number, private imag_: number) {}

  get real() {return this.real_; }
  get imag() {return this.imag_; }

  add(value: ComplexNumber): ComplexNumber {
    let real_part = this.real_ + value.real;
    let imag_part = this.imag_ + value.imag;

    return new ComplexNumber(real_part, imag_part);
  }

  substract(value: ComplexNumber) {
    let real_part = this.real_ - value.real;
    let imag_part = this.imag_ - value.imag;

    return new ComplexNumber(real_part, imag_part);
  }

  multiply(value: ComplexNumber) {
    let real_part = (this.real_ * value.real) - (this.imag_ * value.imag);
    let imag_part = (this.real_ * value.imag) + (this.imag_ * value.real);

    return new ComplexNumber(real_part, imag_part);
  }

  divide(value: ComplexNumber): ComplexNumber {
    let denominator = (value.real_ * value.real_) + (value.imag_ * value.imag_);
    let real_part = ((this.real_ * value.real_) + (this.imag_ * value.imag_)) / denominator;
    let imag_part = ((this.imag_ * value.real_) - (this.real_ * value.imag_)) / denominator;

    return new ComplexNumber(real_part, imag_part);
  }
}