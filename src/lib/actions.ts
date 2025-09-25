"use server";

import { z } from "zod";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Invalid email address."),
    message: z.string().min(10, "Message must be at least 10 characters."),
});

export type FormState = {
    message: string;
    status: "success" | "error";
} | null;

export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
    const validatedFields = contactSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
    });

    if (!validatedFields.success) {
        return {
            message: validatedFields.error.flatten().fieldErrors.message?.[0] || "Validation failed.",
            status: "error",
        };
    }
    
    // Here you would typically send an email or save to a database.
    // For this example, we'll just log the data.
    console.log("Contact form submitted:", validatedFields.data);

    return {
        message: "Thank you! Your message has been sent.",
        status: "success",
    };
}
