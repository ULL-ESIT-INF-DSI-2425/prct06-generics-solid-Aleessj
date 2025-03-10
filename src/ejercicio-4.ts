/**
 * He dividido la interfaz PrintableScannable en dos interfaces diferentes para que se puda cumplir el "Interface segregation principle"
 */

export interface Printable {
  print(): void
}

export interface Scannable {
  scan(): void
}
  
export class Printer implements Printable {
  print(): void { console.log('Printing...'); }

}
  
export class Scanner implements Scannable {
  scan(): void { console.log('Scanning...'); }
}

export class PrinterScanner implements Printable, Scannable {
  print(): void { console.log('Printing...'); }

  scan(): void { console.log('Scanning...'); }
}
  
// Client code
const printer = new Printer();
printer.print();

const scanner = new Scanner();
// Scanning
scanner.scan();

const printerScanner = new PrinterScanner();
// Printing
printerScanner.print();
// Scanning
printerScanner.scan();