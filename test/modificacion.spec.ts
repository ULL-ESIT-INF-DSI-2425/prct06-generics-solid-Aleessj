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


  test("Comprobar funcionamiento de multiply", () => {
    let cn = new ComplexNumber(2, 4);
    expect(cn.multiply(new ComplexNumber(3, 5))).toStrictEqual(new ComplexNumber(-14, 22));
  });

  test("Comprobar funcionamiento de divide", () => {
    let cn = new ComplexNumber(2, 4);
    expect(cn.divide(new ComplexNumber(3, 5))).toStrictEqual(new ComplexNumber((13/17), (1/17)));
  });

  test("Crear una colección vacía", () => {
    const collection = new ArithmeticableCollection<ComplexNumber>([]);
    expect(collection.getNumberOfArithmeticables()).toBe(0);
  });

  test("Agregar un número complejo a la colección", () => {
    const collection = new ArithmeticableCollection<ComplexNumber>([]);
    const complex = new ComplexNumber(1, 2);
    collection.addArithmeticable(complex);
  
    expect(collection.getNumberOfArithmeticables()).toBe(1);
  });

  test("Obtener un número complejo de la colección por índice", () => {
    const complex1 = new ComplexNumber(1, 2);
    const complex2 = new ComplexNumber(3, 4);
    const collection = new ArithmeticableCollection<ComplexNumber>([complex1, complex2]);
  
    expect(collection.getArithmeticable(0)).toEqual(complex1);
    expect(collection.getArithmeticable(1)).toEqual(complex2);
    expect(collection.getArithmeticable(2)).toBeUndefined(); // Índice fuera de rango
  });

  test("Comprobar el tamaño de la colección", () => {
    const collection = new ArithmeticableCollection<ComplexNumber>([]);
    expect(collection.getNumberOfArithmeticables()).toBe(0);
  
    collection.addArithmeticable(new ComplexNumber(1, 1));
    expect(collection.getNumberOfArithmeticables()).toBe(1);
  
    collection.addArithmeticable(new ComplexNumber(2, 2));
    expect(collection.getNumberOfArithmeticables()).toBe(2);
  });
});