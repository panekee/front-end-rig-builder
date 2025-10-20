import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Component, ComponentCategory, Build } from '@/hooks/useBuildStore';
import componentsData from '@/data/components.json';
import { Badge } from '@/components/ui/badge';
import { Pencil, Download } from 'lucide-react';
import { toast } from 'sonner';

interface PremadeCardProps {
  name: string;
  level: string;
  image: string;
  initialComponents: Record<string, string>;
  onLoadBuild: (build: Build) => void;
}

export const PremadeCard = ({ name, level, image, initialComponents, onLoadBuild }: PremadeCardProps) => {
  const [components, setComponents] = useState<Build>({});
  const [modifiedCategories, setModifiedCategories] = useState<Set<string>>(new Set());
  const [isEditing, setIsEditing] = useState(false);

  const categories: ComponentCategory[] = ['CPU', 'GPU', 'Motherboard', 'RAM', 'Storage', 'PSU', 'Case', 'Cooling'];

  useEffect(() => {
    const loadedComponents: Build = {};
    categories.forEach(category => {
      const componentId = initialComponents[category];
      const component = componentsData.components[category].find(c => c.id === componentId);
      if (component) {
        loadedComponents[category] = component;
      }
    });
    setComponents(loadedComponents);
  }, [initialComponents]);

  const getTotalPrice = () => {
    return Object.values(components).reduce((sum, component) => sum + (component?.price || 0), 0);
  };

  const handleComponentChange = (category: ComponentCategory, componentId: string) => {
    const component = componentsData.components[category].find(c => c.id === componentId);
    if (component) {
      setComponents(prev => ({ ...prev, [category]: component }));
      if (initialComponents[category] !== componentId) {
        setModifiedCategories(prev => new Set(prev).add(category));
      } else {
        setModifiedCategories(prev => {
          const newSet = new Set(prev);
          newSet.delete(category);
          return newSet;
        });
      }
    }
  };

  const handleLoadBuild = () => {
    onLoadBuild(components);
    toast.success('Build cargado!', {
      description: `${name} ha sido cargado en tu configuración`
    });
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_hsl(189_94%_55%/0.3)]">
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img src={image} alt={name} className="h-full w-full object-cover" />
        <Badge className="absolute right-4 top-4 bg-primary/90 text-primary-foreground">
          {level}
        </Badge>
      </div>
      
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-foreground">{name}</h3>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant="ghost"
            size="sm"
          >
            <Pencil className="mr-2 h-4 w-4" />
            {isEditing ? 'Ver' : 'Editar'}
          </Button>
        </div>

        <div className="mb-4 space-y-2">
          {categories.map(category => {
            const component = components[category];
            const isModified = modifiedCategories.has(category);

            return (
              <div key={category} className="rounded-lg bg-secondary/50 p-3">
                <p className="mb-1 text-xs font-medium text-muted-foreground">{category}</p>
                {isEditing ? (
                  <Select
                    value={component?.id}
                    onValueChange={(value) => handleComponentChange(category, value)}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {componentsData.components[category].map((comp: Component) => (
                        <SelectItem key={comp.id} value={comp.id}>
                          {comp.name} - ${comp.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-semibold ${isModified ? 'text-primary' : 'text-foreground'}`}>
                      {component?.name}
                      {isModified && <Badge variant="outline" className="ml-2 text-xs">Modificado</Badge>}
                    </p>
                    <p className="text-sm font-bold text-primary">${component?.price}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mb-4 rounded-lg bg-primary/10 p-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-foreground">Total</span>
            <span className="text-2xl font-bold text-primary">${getTotalPrice()}</span>
          </div>
          {modifiedCategories.size > 0 && (
            <p className="mt-1 text-xs text-muted-foreground">
              {modifiedCategories.size} componente{modifiedCategories.size > 1 ? 's' : ''} modificado{modifiedCategories.size > 1 ? 's' : ''}
            </p>
          )}
        </div>

        <Button onClick={handleLoadBuild} className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Cargar en Mi Build
        </Button>
      </div>
    </Card>
  );
};
