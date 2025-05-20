import BaseSmsTemplate from "./templates/base-sms-template";
import BaseSmsTemplateEngine from "./templates/base-sms-template.engine";
import { getTemplateEnums } from "./templates/template.enum";

export default class SmsService {
  private engine: BaseSmsTemplateEngine;
  private map: Map<string, BaseSmsTemplate> = new Map<
    string,
    BaseSmsTemplate
  >();

  constructor() {
    this.engine = new BaseSmsTemplateEngine();
    getTemplateEnums().forEach((template) => {
      const templateClass =
        require(`./templates/${template}/${template}`).default;
      const instance = new templateClass();
      this.registerTemplate(instance);
    });
  }

  registerTemplate(template: BaseSmsTemplate): void {
    const templateName = template.constructor.name;
    if (this.map.has(templateName)) {
      throw new Error(`Template already registered: ${templateName}`);
    }
    this.map.set(templateName, template);
    console.log(`Template registered: ${templateName}`);
  }

  sendSms<T>(args: T): void {
    const templateName = args?.constructor?.name;
    console.log(`Template name: ${templateName}`);

    if (!templateName) {
      throw new Error("Template name is not defined");
    }

    const template = this.map.get(templateName);
    if (!template) {
      throw new Error(`Template not found: ${templateName}`);
    }
    this.engine.sendSMS(template, args);
  }
}
