import BaseSmsTemplate from "./base-sms-template";

export default class BaseSmsTemplateEngine {
  public sendSMS = async <T extends BaseSmsTemplate>(
    template: T,
    args: any
  ) => {
    const templateContent = template.getTemplateContent();
    let smsContent = templateContent;

    const variables = this.findVariables(templateContent);
    const replacements: Record<string, string> = {};
    variables.forEach((variable) => {
      replacements[variable] = args[variable];
    });
    smsContent = this.replaceVariables(smsContent, replacements);
    console.log("SMS içeriği:", smsContent);
  };

  findVariables(text: string) {
    const regex = /{([^{}]*)}/g;
    const matches = [];

    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push(match[1]);
    }

    return matches;
  }

  replaceVariables(text: string, replacements: Record<string, string>) {
    return text.replace(/{([^{}]*)}/g, (match, variable) => {
      return replacements[variable] || match;
    });
  }
}
