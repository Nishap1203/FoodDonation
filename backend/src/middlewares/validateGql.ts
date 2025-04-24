import { ZodSchema, ZodError } from "zod";

export const validateRequest = <T>(Schema: ZodSchema<T>, data: T) => {
  const validation = Schema.safeParse(data);

  if (!validation.success) {
    const errorsArray: string[] = Object.entries(validation.error.format()).flatMap(
      ([field, error]) =>
        //@ts-ignore
        error?._errors?.map((msg: string) => `${field}: ${msg}`) || []
    );

    return {
      message: `Invalid input: ${errorsArray.join(", ")}`,
      email: null,
    };
  }

  return { success: true, data: validation.data };
};
