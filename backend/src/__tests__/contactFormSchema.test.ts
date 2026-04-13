import { contactFormSchema } from "../schemas/contactFormSchema";

const validPayload = {
  firstname: "Jinghuan",
  surname: "Tester",
  email: "jinghuan@example.com",
  telephonenumber: "+358401234567",
  title: "Hello",
  organisation: "Mood Melody",
  message: "Testing contact form",
  roles: ["listener"],
  phoneValidated: true,
};

describe("contactFormSchema", () => {
  it("accepts a valid payload", () => {
    expect(contactFormSchema.parse(validPayload)).toEqual(validPayload);
  });

  it("trims inputs and applies defaults", () => {
    const result = contactFormSchema.parse({
      ...validPayload,
      firstname: "  Alice  ",
      surname: "  Smith  ",
      phoneValidated: null,
    });

    expect(result.firstname).toBe("Alice");
    expect(result.surname).toBe("Smith");
    expect(result.phoneValidated).toBeNull();
  });

  it("rejects invalid english-only fields", () => {
    const result = contactFormSchema.safeParse({
      ...validPayload,
      title: "Hi@",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        "Title contains invalid characters",
      );
    }
  });

  it("rejects an empty roles array", () => {
    const result = contactFormSchema.safeParse({
      ...validPayload,
      roles: [],
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        "At least one role must be selected",
      );
    }
  });
});
