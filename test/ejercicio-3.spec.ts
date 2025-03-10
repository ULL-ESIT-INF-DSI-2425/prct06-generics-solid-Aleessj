import { describe, expect, test, vi, beforeEach } from "vitest";
import * as fs from "fs";
import { IFunctions, FileFunctions, FileManager } from "../src/ejercicio-3";

vi.mock("fs", async () => {
  return {
    readFileSync: vi.fn(),
    writeFileSync: vi.fn(),
  };
});

describe("Pruebas para FileFunctions", () => {
  const mockFilePath = "testfile.txt";
  let fileFunctions: FileFunctions;

  beforeEach(() => {
    fileFunctions = new FileFunctions(mockFilePath);
  });

  test("Debe existir la clase FileFunctions", () => {
    expect(FileFunctions).toBeDefined();
  });

  test("Debe poder instanciar un objeto FileFunctions", () => {
    expect(fileFunctions).toBeInstanceOf(FileFunctions);
  });

  test("Debe leer el contenido de un archivo", () => {
    const mockReadFileSync = vi.spyOn(fs, "readFileSync").mockReturnValue("Contenido de prueba");
    expect(fileFunctions.read()).toBe("Contenido de prueba");
    mockReadFileSync.mockRestore();
  });

  test("Debe manejar errores al leer archivos", () => {
    const mockReadFileSync = vi.spyOn(fs, "readFileSync").mockImplementation(() => {
      throw new Error("Error en lectura");
    });

    expect(fileFunctions.read()).toBe("");
    mockReadFileSync.mockRestore();
  });

  test("Debe escribir contenido en un archivo", () => {
    const mockWriteFileSync = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    
    fileFunctions.write("Nuevo contenido");
    expect(mockWriteFileSync).toHaveBeenCalledWith(mockFilePath, "Nuevo contenido", "utf-8");

    mockWriteFileSync.mockRestore();
  });

  test("Debe manejar errores al escribir archivos", () => {
    const mockWriteFileSync = vi.spyOn(fs, "writeFileSync").mockImplementation(() => {
      throw new Error("Error en escritura");
    });

    expect(() => fileFunctions.write("Nuevo contenido")).not.toThrow();
    mockWriteFileSync.mockRestore();
  });
});

describe("Pruebas para FileManager", () => {
  const mockFunctions: IFunctions = {
    read: vi.fn(() => "Contenido simulado"),
    write: vi.fn()
  };

  const fileManager = new FileManager(mockFunctions);

  test("Debe existir la clase FileManager", () => {
    expect(FileManager).toBeDefined();
  });

  test("Debe poder instanciar un objeto FileManager", () => {
    expect(fileManager).toBeInstanceOf(FileManager);
  });

  test("Debe delegar la lectura a FileFunctions", () => {
    expect(fileManager.readFile()).toBe("Contenido simulado");
    expect(mockFunctions.read).toHaveBeenCalled();
  });

  test("Debe delegar la escritura a FileFunctions", () => {
    fileManager.writeFile("Nuevo contenido");
    expect(mockFunctions.write).toHaveBeenCalledWith("Nuevo contenido");
  });
});