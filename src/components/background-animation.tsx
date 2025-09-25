"use client";

import React from 'react';

const BackgroundAnimation = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/10" />
    </div>
  );
};

export { BackgroundAnimation };
