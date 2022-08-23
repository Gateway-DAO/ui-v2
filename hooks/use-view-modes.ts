import { useState } from 'react';

export enum ViewMode {
  grid,
  table,
}
/*
  Toggles betwen grid and table view modes
*/
export function useViewMode(defaultView = ViewMode.grid) {
  const [view, setView] = useState<ViewMode>(defaultView);
  const toggleView = () => {
    setView((oldView) =>
      oldView === ViewMode.grid ? ViewMode.table : ViewMode.grid
    );
  };
  return { view, toggleView };
}
