import SmsService from "./sms-service";
import VerificationTemplate from "./templates/verification-template/verification-template";

const smsService = new SmsService();

smsService.sendSms(new VerificationTemplate("Gorkem"));
