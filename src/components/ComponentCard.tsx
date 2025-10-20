import { Component } from '@/hooks/useBuildStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface ComponentCardProps {
  component: Component;
  isSelected: boolean;
  onSelect: () => void;
}

export const ComponentCard = ({ component, isSelected, onSelect }: ComponentCardProps) => {
  return (
    <Card 
      className={`
        group relative overflow-hidden transition-all duration-300
        hover:shadow-[0_0_30px_hsl(189_94%_55%/0.3)]
        ${isSelected ? 'ring-2 ring-primary shadow-[0_0_30px_hsl(189_94%_55%/0.4)]' : ''}
      `}
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img 
          src={component.image} 
          alt={component.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-2 font-semibold text-foreground line-clamp-2">{component.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">${component.price}</span>
          <Button 
            onClick={onSelect}
            variant={isSelected ? "default" : "secondary"}
            size="sm"
            className="transition-all duration-300"
          >
            {isSelected ? (
              <>
                <Check className="mr-1 h-4 w-4" />
                Seleccionado
              </>
            ) : (
              'Agregar'
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};
