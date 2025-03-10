import { describe, expect, test, vi } from "vitest";
import { Printer, Scanner, PrinterScanner } from "../src/ejercicio-4";

describe("Pruebas para la interfaz Printable", () => {
  test("La clase Printer debe implementar Printable", () => {
    const printer = new Printer();
    expect(printer.print).toBeInstanceOf(Function);
  });

  test("Printer debe imprimir correctamente", () => {
    const printer = new Printer();
    const consoleSpy = vi.spyOn(console, "log");
    printer.print();
    expect(consoleSpy).toHaveBeenCalledWith("Printing...");
  });
});

describe("Pruebas para la interfaz Scannable", () => {
  test("La clase Scanner debe implementar Scannable", () => {
    const scanner = new Scanner();
    expect(scanner.scan).toBeInstanceOf(Function);
  });

  test("Scanner debe escanear correctamente", () => {
    const scanner = new Scanner();
    const consoleSpy = vi.spyOn(console, "log");
    scanner.scan();
    expect(consoleSpy).toHaveBeenCalledWith("Scanning...");
  });
});

describe("Pruebas para la clase PrinterScanner", () => {
  test("PrinterScanner debe implementar Printable y Scannable", () => {
    const printerScanner = new PrinterScanner();
    expect(printerScanner.print).toBeInstanceOf(Function);
    expect(printerScanner.scan).toBeInstanceOf(Function);
  });

  test("PrinterScanner debe imprimir correctamente", () => {
    const printerScanner = new PrinterScanner();
    const consoleSpy = vi.spyOn(console, "log");
    printerScanner.print();
    expect(consoleSpy).toHaveBeenCalledWith("Printing...");
  });

  test("PrinterScanner debe escanear correctamente", () => {
    const printerScanner = new PrinterScanner();
    const consoleSpy = vi.spyOn(console, "log");
    printerScanner.scan();
    expect(consoleSpy).toHaveBeenCalledWith("Scanning...");
  });
});