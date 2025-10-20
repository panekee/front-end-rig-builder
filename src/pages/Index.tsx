import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ComponentSelector } from '@/components/ComponentSelector';
import { BuildSummary } from '@/components/BuildSummary';
import { PriceDisplay } from '@/components/PriceDisplay';
import { PremadeCard } from '@/components/PremadeCard';
import { useBuildStore } from '@/hooks/useBuildStore';
import componentsData from '@/data/components.json';
import { Cpu } from 'lucide-react';

const Index = () => {
  const { loadBuild } = useBuildStore();
  const [activeSection, setActiveSection] = useState('build');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-primary to-primary/60 p-2 shadow-[0_0_20px_hsl(189_94%_55%/0.3)]">
                <Cpu className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">PC Builder</h1>
                <p className="text-xs text-muted-foreground">Construye tu PC ideal</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeSection} onValueChange={setActiveSection}>
          <TabsList className="mb-8 grid w-full max-w-md grid-cols-2 bg-secondary/50">
            <TabsTrigger value="build" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Construye tu PC
            </TabsTrigger>
            <TabsTrigger value="premades" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              PCs Premade
            </TabsTrigger>
          </TabsList>

          <TabsContent value="build">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ComponentSelector />
              </div>
              <div className="space-y-4">
                <PriceDisplay />
                <BuildSummary />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="premades">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {componentsData.premades.map((premade) => (
                <PremadeCard
                  key={premade.id}
                  name={premade.name}
                  level={premade.level}
                  image={premade.image}
                  initialComponents={premade.components}
                  onLoadBuild={loadBuild}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border bg-card py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            PC Builder MVP - Construye, personaliza y visualiza tu PC ideal
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
