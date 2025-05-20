import { dirname } from "path";
import { readFileSync } from "fs";

export default class BaseSmsTemplate {
  protected templateContent: string;

  constructor() {
    const dir = this.getcallerDir();
    this.templateContent = this.readTemplate(dir);
  }

  getTemplateContent(): string {
    return this.templateContent;
  }

  protected readTemplate(dir: string): string {
    const templatePath = `${dir}/sms.template`;
    console.log(`Template okunuyor: ${templatePath}`);
    try {
      return readFileSync(templatePath, "utf-8");
    } catch (error) {
      throw new Error(`Unable to find template: ${templatePath}`);
    }
  }

  private getcallerDir(): string {
    const stack = new Error().stack?.split("\n") || [];

    // Windows path normalization
    const baseFile = __filename.replace(/\\/g, "/");

    for (const line of stack) {
      const match = line.match(/\((.*?):\d+:\d+\)/);
      if (match) {
        const filePath = match[1].replace(/\\/g, "/");
        if (!filePath.includes(baseFile)) {
          return dirname(filePath);
        }
      }
    }
    throw new Error("Unable to determine caller directory");
  }
}
