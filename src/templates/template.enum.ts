export enum TemplateEnum {
  VerificationTemplate = "verification-template",
}
export default TemplateEnum;

export function getTemplateEnums(): string[] {
  return Object.values(TemplateEnum).filter(
    (value) => typeof value === "string"
  ) as string[];
}
