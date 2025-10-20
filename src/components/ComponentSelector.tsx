import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ComponentCard } from './ComponentCard';
import { Component, ComponentCategory, useBuildStore } from '@/hooks/useBuildStore';
import componentsData from '@/data/components.json';

export const ComponentSelector = () => {
  const { build, addComponent } = useBuildStore();
  const [activeTab, setActiveTab] = useState<ComponentCategory>('CPU');

  const categories: ComponentCategory[] = ['CPU', 'GPU', 'Motherboard', 'RAM', 'Storage', 'PSU', 'Case', 'Cooling'];

  const getComponents = (category: ComponentCategory): Component[] => {
    return componentsData.components[category] || [];
  };

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ComponentCategory)}>
        <TabsList className="mb-6 grid w-full grid-cols-4 gap-2 bg-secondary/50 p-2 lg:grid-cols-8">
          {categories.map((category) => (
            <TabsTrigger 
              key={category} 
              value={category}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {getComponents(category).map((component) => {
                const isSelected = build[category]?.id === component.id;
                console.log(`Component ${component.id} selected:`, isSelected, 'Current build:', build[category]);
                return (
                  <ComponentCard
                    key={component.id}
                    component={component}
                    isSelected={isSelected}
                    onSelect={() => addComponent(category, component)}
                  />
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
