import { describe, expect, test } from "vitest";
import {ArithmeticableCollection, ComplexNumber } from "../src/modificacion";

describe("Test para Clases", () => {
  test("Esta definida", () => {
    expect(ArithmeticableCollection).toBeDefined();
  });

  test("Esta definida", () => {
    expect(ComplexNumber).toBeDefined();
  });

  test("Comprobar funcionamiento de add", () => {
    let cn = new ComplexNumber(2, 4);
    expect(cn.add(new ComplexNumber(3, 5))).toStrictEqual(new ComplexNumber(5, 9));
  });

  test("Comprobar funcionamiento de substract", () => {
    let cn = new ComplexNumber(2, 4);
    expect(cn.substract(new ComplexNumber(1, 3))).toStrictEqual(new ComplexNumber(1, 1));
  });


  /*test("Comprobar funcionamiento de multiply", () => {
    let cn = new ComplexNumber(2, 4);
    expect(cn.multiply(new ComplexNumber(3, 5))).toStrictEqual(new ComplexNumber(2, 17));
  });*/

  /*test("Comprobar funcionamiento de divide", () => {
    let cn = new ComplexNumber(2, 4);
    expect(cn.divide(new ComplexNumber(3, 5))).toStrictEqual(new ComplexNumber(0.7647058824, 0.0588235294));
  });*/
});