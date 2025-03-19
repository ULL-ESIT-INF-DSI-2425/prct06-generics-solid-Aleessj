import { describe, expect, test } from "vitest";
import { Rational, Adapter } from "../src/modificacion-2";
import { ComplexNumber } from "../src/modificacion";
import { aD } from "vitest/dist/chunks/reporters.QZ837uWx.js";

describe("Test para Clases", () => {
  test("Esta definida", () => {
    expect(Rational).toBeDefined();
  });

  test("Comprobar funcionamiento de add", () => {
    let rational = new Rational(1, 2);
    expect(rational.add(new Rational(2, 4))).toStrictEqual(new Rational(8, 8));
  });

  test("Comprobar funcionamiento de substract", () => {
    let rational = new Rational(1, 2);
    expect(rational.substract(new Rational(1, 4))).toStrictEqual(new Rational(2, 8));
  });


  test("Comprobar funcionamiento de multiply", () => {
    let rational = new Rational(1, 2);
    expect(rational.multiply(new Rational(2, 4))).toStrictEqual(new Rational(2, 8));
  });

  test("Comprobar funcionamiento de divide", () => {
    let rational = new Rational(1, 2);
    expect(rational.divide(new Rational(2, 4))).toStrictEqual(new Rational(4, 4));
  });

  test("Esta definida", () => {
    expect(Adapter).toBeDefined();
  });

  test("Comprobar funcionamiento de add (Complejo y Racional)", () => {
    let adap = new Adapter(new Rational(5, 5));
    expect(adap.add(new ComplexNumber(3, 5))).toStrictEqual(new ComplexNumber(4, 5));
  });

  test("Comprobar funcionamiento de add II (Complejo y Racional)", () => {
    let adap = new Adapter(new Rational(1, 2));
    expect(adap.add(new ComplexNumber(3, 5))).toStrictEqual(new ComplexNumber(3.5, 5));
  });

  test("Comprobar funcionamiento de add III (Complejo y Racional)", () => {
    let adap = new Adapter(new Rational(4, 2));
    expect(adap.add(new ComplexNumber(3, 5))).toStrictEqual(new ComplexNumber(5, 5));
  });

  test("Comprobar funcionamiento de substract (Complejo y Racional)", () => {
    let adap = new Adapter(new Rational(5, 5));
    expect(adap.substract(new ComplexNumber(3, 5))).toStrictEqual(new ComplexNumber(-2, -5));
  });

  test("Comprobar funcionamiento de substract II (Complejo y Racional)", () => {
    let adap = new Adapter(new Rational(1, 2));
    expect(adap.substract(new ComplexNumber(3, 5))).toStrictEqual(new ComplexNumber(-2.5, -5));
  });

  test("Comprobar funcionamiento de substract III (Complejo y Racional)", () => {
    let adap = new Adapter(new Rational(4, 2));
    expect(adap.substract(new ComplexNumber(3, 5))).toStrictEqual(new ComplexNumber(-1, -5));
  });

  test("Comprobar funcionamiento de multiply (Complejo y Racional)", () => {
    let adap = new Adapter(new Rational(5, 5));
    expect(adap.multiply(new ComplexNumber(3, 5))).toStrictEqual(new ComplexNumber(3, 5));
  });

  test("Comprobar funcionamiento de multiply II (Complejo y Racional)", () => {
    let adap = new Adapter(new Rational(1, 2));
    expect(adap.multiply(new ComplexNumber(3, 5))).toStrictEqual(new ComplexNumber(1.5, 2.5));
  });

  test("Comprobar funcionamiento de multiply III (Complejo y Racional)", () => {
    let adap = new Adapter(new Rational(4, 2));
    expect(adap.multiply(new ComplexNumber(3, 5))).toStrictEqual(new ComplexNumber(6, 10));
  });
});