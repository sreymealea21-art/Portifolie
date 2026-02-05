// Polyfill for React 19 which removed findDOMNode
// This is needed for react-slick and react-transition-group compatibility

import * as ReactInternal from 'react';

export function findDOMNode(component) {
  if (component == null) {
    return null;
  }

  if (component.nodeType) {
    return component;
  }

  // Try to get DOM node from React Fiber (modern React)
  try {
    const fiberKey = Object.keys(component).find(
      key => key.startsWith('__react') && key.includes('Fiber')
    );
    
    if (fiberKey && component[fiberKey]) {
      let fiber = component[fiberKey];
      let currentFiber = fiber;
      
      while (currentFiber) {
        if (currentFiber.stateNode && currentFiber.stateNode.nodeType) {
          return currentFiber.stateNode;
        }
        currentFiber = currentFiber.child;
      }
    }
  } catch (e) {
    // Silently fail and continue
  }

  return null;
}

// Patch react-dom if it's available
if (typeof window !== 'undefined' && window.ReactDOM) {
  if (!window.ReactDOM.findDOMNode) {
    window.ReactDOM.findDOMNode = findDOMNode;
  }
}

export default findDOMNode;
