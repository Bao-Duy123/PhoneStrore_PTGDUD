import { cn } from '@/lib/utils';

const Card = ({ children, className, padding = 'md' }) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div className={cn(
      'bg-white rounded-xl shadow-sm border border-gray-100',
      paddings[padding],
      className
    )}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className }) => {
  return (
    <div className={cn('mb-4', className)}>
      {children}
    </div>
  );
};

const CardTitle = ({ children, className }) => {
  return (
    <h3 className={cn('text-lg font-bold text-gray-900', className)}>
      {children}
    </h3>
  );
};

const CardContent = ({ children, className }) => {
  return (
    <div className={cn(className)}>
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;
Card.content = CardContent; // Lowercase alias for convenience

export { Card, CardHeader, CardTitle, CardContent };
