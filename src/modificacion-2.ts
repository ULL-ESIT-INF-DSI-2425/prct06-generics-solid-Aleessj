import {Arithmeticable, ComplexNumber} from "./modificacion"

export class Rational implements Arithmeticable<Rational> {
  /**
   * Constructor por defecto
   * @param num_ - Numerador del racional
   * @param denom_ - Denominador del racional
   */
  constructor(private num_: number, private denom_: number) {}
  /**
   * Getter de num
   */
  get num() { return this.num_; }

  /**
   * Getter de denom
   */
  get denom() { return this.denom_; }

  /**
   * Suma entre dos números racionales
   * @param value - Numero Racional
   * @returns suma de dos racionales
   */
  add(value: Rational): Rational {
    let final_num = (this.num_ * value.denom) + (value.num * this.denom_);
    let final_denom = this.denom_ * value.denom;
    return new Rational(final_num, final_denom);
  }

  /**
   * Resta entre dos números racionales
   * @param value - Numero Racional
   * @returns resta de dos racionales
   */
  substract(value: Rational): Rational {
    let final_num = (this.num_ * value.denom) - (value.num * this.denom_);
    let final_denom = this.denom_ * value.denom;
    return new Rational(final_num, final_denom);
  }

  /**
   * Multiplicacion entre dos números racionales
   * @param value - Numero Racional
   * @returns producto de dos racionales
   */
  multiply(value: Rational): Rational {
    return new Rational(this.num_ * value.num, this.denom_ * value.denom);
  }

  /**
   * Division entre dos números racionales
   * @param value - Numero Racional
   * @returns division de dos racionales
   */
  divide(value: Rational): Rational {
    return new Rational(this.num_ * value.denom, this.denom_ * value.num);
  }
}

/**
 * Clase Adapter que permite operaciones entre racionales y complejos.
 */
export class Adapter extends ComplexNumber {
  /**
   * Constructor de la clase adpater
   * @param rational - Representa la parte entera del número complejo
   */
  constructor(private rational: Rational) {
    super(rational.num / rational.denom, 0);
  }
}