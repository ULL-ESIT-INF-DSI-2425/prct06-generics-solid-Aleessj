import { describe, expect, test, vi } from "vitest";
import { EmailService, ShortMessageService, Notifier } from "../src/ejercicio-5"; // Asegúrate de importar correctamente

describe("Pruebas para EmailService", () => {
  test("Debe implementar INotificationService y tener el método notify", () => {
    const emailService = new EmailService();
    expect(emailService.notify).toBeInstanceOf(Function);
  });

  test("Debe enviar notificación por correo electrónico", () => {
    const emailService = new EmailService();
    const consoleSpy = vi.spyOn(console, "log");
    
    emailService.notify("Test email notification");
    
    expect(consoleSpy).toHaveBeenCalledWith("Sending notification by email: Test email notification");
  });
});

describe("Pruebas para ShortMessageService", () => {
  test("Debe implementar INotificationService y tener el método notify", () => {
    const smsService = new ShortMessageService();
    expect(smsService.notify).toBeInstanceOf(Function);
  });

  test("Debe enviar notificación por SMS", () => {
    const smsService = new ShortMessageService();
    const consoleSpy = vi.spyOn(console, "log");
    
    smsService.notify("Test SMS notification");
    
    expect(consoleSpy).toHaveBeenCalledWith("Sending notification by SMS: Test SMS notification");
  });
});

describe("Pruebas para Notifier", () => {
  test("Debe enviar notificaciones utilizando EmailService", () => {
    const emailService = new EmailService();
    const notifier = new Notifier(emailService);
    const consoleSpy = vi.spyOn(console, "log");
    
    notifier.sendNotification("Test notification");
    
    expect(consoleSpy).toHaveBeenCalledWith("Sending notification by email: Test notification");
  });

  test("Debe enviar notificaciones utilizando ShortMessageService", () => {
    const smsService = new ShortMessageService();
    const notifier = new Notifier(smsService);
    const consoleSpy = vi.spyOn(console, "log");
    
    notifier.sendNotification("Test SMS notification");
    
    expect(consoleSpy).toHaveBeenCalledWith("Sending notification by SMS: Test SMS notification");
  });

  test("Debe permitir cambiar el servicio de notificación dinámicamente", () => {
    const emailService = new EmailService();
    const smsService = new ShortMessageService();

    let notifier = new Notifier(emailService);
    const consoleSpy = vi.spyOn(console, "log");

    notifier.sendNotification("Initial notification");
    expect(consoleSpy).toHaveBeenCalledWith("Sending notification by email: Initial notification");

    // Cambiamos al servicio de SMS
    notifier = new Notifier(smsService);
    notifier.sendNotification("Switched to SMS");
    expect(consoleSpy).toHaveBeenCalledWith("Sending notification by SMS: Switched to SMS");
  });
});