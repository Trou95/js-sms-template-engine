import BaseSmsTemplate from "../base-sms-template";

export default class VerificationTemplate extends BaseSmsTemplate {
  private readonly code: string;

  constructor(private readonly username: string, code?: string) {
    super();
    this.code = code ?? this.generateCode();
  }

  generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
