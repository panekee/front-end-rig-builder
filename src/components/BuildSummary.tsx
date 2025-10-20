import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBuildStore, ComponentCategory } from '@/hooks/useBuildStore';
import { Trash2, Save, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

export const BuildSummary = () => {
  const { build, removeComponent, resetBuild, getTotalPrice } = useBuildStore();
  
  const categories: ComponentCategory[] = ['CPU', 'GPU', 'Motherboard', 'RAM', 'Storage', 'PSU', 'Case', 'Cooling'];
  const componentCount = Object.keys(build).length;

  const handleSave = () => {
    toast.success('Build guardado exitosamente!', {
      description: `${componentCount} componentes guardados en localStorage`
    });
  };

  const handleReset = () => {
    resetBuild();
    toast.info('Build reseteado', {
      description: 'Todos los componentes han sido eliminados'
    });
  };

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Tu Build</h2>
        <div className="flex gap-2">
          <Button onClick={handleSave} size="sm" variant="default">
            <Save className="mr-2 h-4 w-4" />
            Guardar
          </Button>
          <Button onClick={handleReset} size="sm" variant="destructive">
            <RotateCcw className="mr-2 h-4 w-4" />
            Resetear
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {categories.map((category) => {
          const component = build[category];
          return (
            <div 
              key={category}
              className="flex items-center justify-between rounded-lg bg-secondary/50 p-3 transition-all hover:bg-secondary"
            >
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground">{category}</p>
                {component ? (
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">{component.name}</p>
                    <p className="text-sm font-bold text-primary">${component.price}</p>
                  </div>
                ) : (
                  <p className="text-sm italic text-muted-foreground">No seleccionado</p>
                )}
              </div>
              {component && (
                <Button
                  onClick={() => removeComponent(category)}
                  size="sm"
                  variant="ghost"
                  className="ml-2 h-8 w-8 p-0 hover:bg-destructive/20 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-lg bg-primary/10 p-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-foreground">Total</span>
          <span className="text-2xl font-bold text-primary">${getTotalPrice()}</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{componentCount} de 8 componentes seleccionados</p>
      </div>
    </Card>
  );
};
