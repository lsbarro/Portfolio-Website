import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(
        () => localStorage.getItem('theme') || 'light'
    );
    
    // Enhanced theme change handler that properly updates background system
    const updateBackgroundForTheme = useCallback((newTheme) => {
        const root = document.documentElement;
        const isDarkMode = newTheme === 'dark';
        
        // Update document attribute first
        root.setAttribute('data-theme', newTheme);
        
        // Update background elements
        const bg = document.querySelector('.background');
        const overlay = document.querySelector('.background-overlay');
        
        if (bg && overlay) {
            // Apply transition class for smooth animation
            document.body.classList.add('theme-transition');
            
            if (isDarkMode) {
                // Dark mode enhancements
                overlay.style.opacity = '1';
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.65)';
                bg.style.filter = 'brightness(0.85)';
                
                // Ensure overlay has sufficient height
                const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
                    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
                
                overlay.style.height = isIOS ? '800vh' : '600vh';
                overlay.style.minHeight = isIOS ? '800vh' : '600vh';
                
                // Set CSS variable
                document.documentElement.style.setProperty('--overlay-opacity', '1');
                
                // Handle iOS specific dark mode issues
                if (isIOS) {
                    let extraOverlay = document.querySelector('.ios-dark-mode-overlay');
                    if (!extraOverlay) {
                        extraOverlay = document.createElement('div');
                        extraOverlay.className = 'ios-dark-mode-overlay';
                        extraOverlay.style.position = 'fixed';
                        extraOverlay.style.top = '0';
                        extraOverlay.style.left = '0';
                        extraOverlay.style.width = '100vw';
                        extraOverlay.style.height = '800vh';
                        extraOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                        extraOverlay.style.zIndex = '-1';
                        extraOverlay.style.pointerEvents = 'none';
                        document.body.appendChild(extraOverlay);
                    }
                }
            } else {
                // Light mode
                overlay.style.opacity = '0';
                bg.style.filter = 'none';
                document.documentElement.style.setProperty('--overlay-opacity', '0');
                
                // Remove iOS dark mode overlay if it exists
                const extraOverlay = document.querySelector('.ios-dark-mode-overlay');
                if (extraOverlay) {
                    extraOverlay.remove();
                }
            }
            
            // Update content mask if it exists
            const contentMask = document.querySelector('.content-mask');
            if (contentMask) {
                contentMask.style.background = 'linear-gradient(to bottom, transparent 0%, var(--background-color) 100%)';
            }
            
            // Remove transition class after animation completes
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 500);
        }
    }, []);

    useEffect(() => {
        // Apply theme on initial render
        updateBackgroundForTheme(theme);
        
        // Store theme in localStorage for persistence
        localStorage.setItem('theme', theme);
    }, [theme, updateBackgroundForTheme]);

    const toggleTheme = () => { 
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}