"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitContactForm, type FormState } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Section } from "./section";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" className="w-full" disabled={pending}>{pending ? "Sending..." : "Send Message"}</Button>;
}

export function Contact() {
  const [state, formAction] = useFormState<FormState, FormData>(submitContactForm, null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  useEffect(() => {
    if (state?.status === 'success') {
      toast({
        title: "Success!",
        description: state.message,
      });
      form.reset();
    } else if (state?.status === 'error') {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, form, toast]);


  return (
    <Section id="contact">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
            Get in Touch
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Have a question or want to work together? Fill out the form below.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-2">
           <Card className="text-left">
              <CardHeader>
                <CardTitle className="font-headline">Contact Me</CardTitle>
                <CardDescription>I'll get back to you as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                   <form ref={formRef} action={formAction} className="space-y-4">
                      <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your Name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="your.email@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Your message..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <SubmitButton />
                   </form>
                </Form>
              </CardContent>
           </Card>
        </div>
      </div>
    </Section>
  );
}
