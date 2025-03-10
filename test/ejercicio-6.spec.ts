import { describe, expect, test, vi } from "vitest";
import { Bird, Sparrow, Penguin } from "../src/ejercicio-6"; // Asegúrate de importar correctamente

describe("Pruebas para la clase Bird", () => {
  test("Debe crear una instancia de Bird con un nombre", () => {
    const bird = new Bird("Generic Bird");
    expect(bird).toBeInstanceOf(Bird);
    expect(bird.name).toBe("Generic Bird");
  });

  test("Debe permitir que el ave coma", () => {
    const bird = new Bird("Generic Bird");
    const consoleSpy = vi.spyOn(console, "log");
    
    bird.eat();
    
    expect(consoleSpy).toHaveBeenCalledWith("Generic Bird is eating...");
  });
});

describe("Pruebas para la clase Sparrow", () => {
  test("Debe crear una instancia de Sparrow", () => {
    const sparrow = new Sparrow("Jack Sparrow");
    expect(sparrow).toBeInstanceOf(Sparrow);
    expect(sparrow.name).toBe("Jack Sparrow");
  });

  test("Debe permitir que el gorrión vuele", () => {
    const sparrow = new Sparrow("Jack Sparrow");
    const consoleSpy = vi.spyOn(console, "log");
    
    sparrow.fly();
    
    expect(consoleSpy).toHaveBeenCalledWith("Jack Sparrow is flying...");
  });

  test("Debe permitir que el gorrión coma (heredado de Bird)", () => {
    const sparrow = new Sparrow("Jack Sparrow");
    const consoleSpy = vi.spyOn(console, "log");
    
    sparrow.eat();
    
    expect(consoleSpy).toHaveBeenCalledWith("Jack Sparrow is eating...");
  });
});

describe("Pruebas para la clase Penguin", () => {
  test("Debe crear una instancia de Penguin", () => {
    const penguin = new Penguin("Pingu");
    expect(penguin).toBeInstanceOf(Penguin);
    expect(penguin.name).toBe("Pingu");
  });

  test("Debe permitir que el pingüino nade", () => {
    const penguin = new Penguin("Pingu");
    const consoleSpy = vi.spyOn(console, "log");
    
    penguin.swim();
    
    expect(consoleSpy).toHaveBeenCalledWith("Pingu is swimming...");
  });

  test("Debe permitir que el pingüino coma (heredado de Bird)", () => {
    const penguin = new Penguin("Pingu");
    const consoleSpy = vi.spyOn(console, "log");
    
    penguin.eat();
    
    expect(consoleSpy).toHaveBeenCalledWith("Pingu is eating...");
  });
})