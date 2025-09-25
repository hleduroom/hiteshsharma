import { Terminal } from "../terminal";

export function TerminalSection() {
  return (
    <section id="terminal" className="w-full bg-secondary py-16 md:py-24 lg:py-32">
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
    </section>
  );
}
