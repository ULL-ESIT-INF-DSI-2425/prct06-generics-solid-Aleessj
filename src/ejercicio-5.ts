/**
 * He implementado la interfaz INotificationService para así poder cumplir con el "Dependency Inversion Principle", 
 * dado que la clase Notifier depende de la interfaz.
*/

export interface INotificationService {
  notify(message: string): void;
}

// Class that allows notifications by email to be sent
export class EmailService implements INotificationService {
  notify(message: string): void { console.log(`Sending notification by email: ${message}`); }
}

// Class that allows notifications by SMS to be sent
export class ShortMessageService implements INotificationService {
  notify(message: string): void { console.log(`Sending notification by SMS: ${message}`); }
}

// Class that makes use of different types of services to perform notifications
export class Notifier {
  constructor(private notificationService: INotificationService) {}

  sendNotification(message: string): void { this.notificationService.notify(message); }
}

// Client code
const emailNotifier = new Notifier(new EmailService());
emailNotifier.sendNotification('Hello World!');

const shortMessageNotifier = new Notifier(new ShortMessageService());
shortMessageNotifier.sendNotification('Hello World!');