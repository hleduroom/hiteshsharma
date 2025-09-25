import { Terminal } from "../terminal";
import { Section } from "./section";

export function TerminalSection() {
  return (
    <Section id="terminal" className="bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
              Interactive Terminal
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Use the terminal below to navigate through my portfolio details. Type `help` to see the available commands.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <Terminal />
        </div>
      </div>
    </Section>
  );
}
