// src/components/IconWrapper.tsx
import React from 'react';
import * as LucideIcons from 'lucide-react'; // Import all icons

interface IconWrapperProps {
  IconComponentName: string; // Now expecting a string name
  className?: string;
}

const IconWrapper = ({ IconComponentName, className }: IconWrapperProps) => {
  // Type assertion to tell TypeScript that LucideIcons might contain a React component
  const IconComponent = (LucideIcons as unknown as { [key: string]: React.ComponentType<any> })[IconComponentName];

  if (!IconComponent) {
    console.warn(`Icon component with name "${IconComponentName}" not found.`);
    return null;
  }

  return <IconComponent className={className} />;
};

export default IconWrapper;