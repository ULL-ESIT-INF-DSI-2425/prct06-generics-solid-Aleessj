import * as fs from "fs";

/*
  He creado una interfaz IFunctions y la clase FileFunctions para respertar el principio de responsabilidad única.
  Ahora la clases respetan el principio Open/Closed.
  Ahora la clase FileManager cumple con el principio de Dependency Inversion.
*/
export interface IFunctions {
  read(): string;
  write(data: string): void;
}

export class FileFunctions implements IFunctions {
  constructor(private filePath: string) {}

  read(): string {
    try {
      const content: string = fs.readFileSync(this.filePath, "utf-8");
      return content;
    } catch (error) {
      console.error("Error al leer el archivo");
      return "";
    }
  }

  write(data: string): void {
    try {
      fs.writeFileSync(this.filePath, data, "utf-8");
      console.log("Archivo escrito exitosamente.");
    } catch (error) {
      console.error("Error al escribir en el archivo");
    }
  }
}

export class FileManager {
  constructor(private action: IFunctions) {}

  public readFile(): string { return this.action.read(); }
  public writeFile(data: string): void { return this.action.write(data); }
}

/*const file_function = new FileFunctions("example.txt");
const fileManager = new FileManager(file_function);

const currentContent = fileManager.readFile();
console.log("Current content:", currentContent);

const newData = "This is new content to be written into the file.";
fileManager.writeFile(newData);

const updatedContent = fileManager.readFile();
console.log("Updated content:", updatedContent);*/