"use client";

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type Output = {
  command: string;
  result: React.ReactNode;
};

const commands: { [key: string]: string | React.ReactNode } = {
  help: (
    <div>
      <p>Available commands:</p>
      <ul className="list-disc list-inside">
        <li><span className="text-accent">about</span> - Who am I?</li>
        <li><span className="text-accent">projects</span> - View my work</li>
        <li><span className="text-accent">skills</span> - What I can do</li>
        <li><span className="text-accent">contact</span> - Get in touch</li>
        <li><span className="text-accent">clear</span> - Clear the terminal</li>
      </ul>
    </div>
  ),
  about: "I'm a passionate developer and educator dedicated to creating amazing digital experiences and sharing knowledge. I run HLEduRoom to help students learn and grow.",
  projects: "I've worked on a variety of projects, from educational web apps to e-commerce platforms. Check out the projects section above for more details!",
  skills: (
    <div>
      <p>My skillset includes:</p>
      <ul className="list-disc list-inside">
        <li>Frontend: React, Next.js, TypeScript, Tailwind CSS</li>
        <li>Backend: Node.js, Express, Firebase</li>
        <li>3D/Graphics: Three.js, WebGL</li>
        <li>DevOps: Docker, Vercel</li>
      </ul>
    </div>
  ),
  contact: "You can reach me via the contact form below or at contact@thehiteshsir.com.",
};

export const Terminal = () => {
  const [input, setInput] = useState('');
  const [outputs, setOutputs] = useState<Output[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [outputs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = input.toLowerCase().trim();
      let result: React.ReactNode;

      if (command === 'clear') {
        setOutputs([]);
        setInput('');
        return;
      }

      if (command in commands) {
        result = commands[command];
      } else {
        result = `Command not found: ${command}. Type 'help' for a list of commands.`;
      }
      
      setOutputs(prev => [...prev, { command, result }]);
      setInput('');
    }
  };

  const prompt = <span className="text-accent">user@hlesir:~$</span>;

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-4xl mx-auto rounded-lg shadow-2xl border bg-card text-card-foreground" 
      onClick={() => inputRef.current?.focus()}
    >
      <div className="h-8 rounded-t-lg bg-secondary flex items-center px-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      <div ref={scrollRef} className="h-80 overflow-y-auto p-4 font-code text-sm">
        <div>Welcome to my interactive terminal! Type 'help' to get started.</div>
        {outputs.map((output, i) => (
          <div key={i}>
            <div className="flex items-center space-x-2">
              {prompt}
              <span>{output.command}</span>
            </div>
            <div className={cn(typeof output.result === 'string' ? 'whitespace-pre-wrap' : '')}>{output.result}</div>
          </div>
        ))}
        <div className="flex items-center space-x-2">
          {prompt}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleCommand}
            className="bg-transparent border-none focus:ring-0 w-full p-0"
            aria-label="Terminal input"
          />
        </div>
      </div>
    </motion.div>
  );
};
