import { useState, useEffect } from 'react';

export type ComponentCategory = 'CPU' | 'GPU' | 'Motherboard' | 'RAM' | 'Storage' | 'PSU' | 'Case' | 'Cooling';

export interface Component {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface Build {
  CPU?: Component;
  GPU?: Component;
  Motherboard?: Component;
  RAM?: Component;
  Storage?: Component;
  PSU?: Component;
  Case?: Component;
  Cooling?: Component;
}

const STORAGE_KEY = 'pc-builder-current-build';

export const useBuildStore = () => {
  const [build, setBuild] = useState<Build>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(build));
  }, [build]);

  const addComponent = (category: ComponentCategory, component: Component) => {
    console.log('Adding component:', { category, component });
    setBuild(prev => {
      const newBuild = { ...prev, [category]: component };
      console.log('New build state:', newBuild);
      return newBuild;
    });
  };

  const removeComponent = (category: ComponentCategory) => {
    setBuild(prev => {
      const newBuild = { ...prev };
      delete newBuild[category];
      return newBuild;
    });
  };

  const resetBuild = () => {
    setBuild({});
  };

  const getTotalPrice = () => {
    return Object.values(build).reduce((sum, component) => sum + (component?.price || 0), 0);
  };

  const loadBuild = (newBuild: Build) => {
    setBuild(newBuild);
  };

  return {
    build,
    addComponent,
    removeComponent,
    resetBuild,
    getTotalPrice,
    loadBuild
  };
};
