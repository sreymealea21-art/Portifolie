import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ThemeContextProvider from './contexts/ThemeContext';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Polyfill for React 19 compatibility with libraries like react-slick
if (!ReactDOM.findDOMNode) {
  ReactDOM.findDOMNode = function(component) {
    if (!component) return null;
    if (component.nodeType) return component;
    try {
      const fiberKey = Object.keys(component).find(key => 
        key.startsWith('__react') && key.includes('Fiber')
      );
      if (fiberKey) {
        let fiber = component[fiberKey];
        while (fiber) {
          if (fiber.stateNode && fiber.stateNode.nodeType) {
            return fiber.stateNode;
          }
          fiber = fiber.child;
        }
      }
    } catch (e) {}
    return null;
  };
}

ReactDOM.render(
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>,
  document.getElementById('root')
);


reportWebVitals();
