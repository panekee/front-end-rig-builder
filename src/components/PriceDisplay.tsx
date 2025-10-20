import { Card } from '@/components/ui/card';
import { useBuildStore } from '@/hooks/useBuildStore';

export const PriceDisplay = () => {
  const { getTotalPrice } = useBuildStore();
  const total = getTotalPrice();

  return (
    <Card className="sticky top-4 bg-gradient-to-br from-primary/20 to-primary/10 p-6 shadow-[0_0_30px_hsl(189_94%_55%/0.2)]">
      <div className="text-center">
        <p className="mb-2 text-sm font-medium text-muted-foreground">Precio Total</p>
        <p className="text-4xl font-bold text-primary">${total}</p>
        <p className="mt-2 text-xs text-muted-foreground">Actualizado en tiempo real</p>
      </div>
    </Card>
  );
};
