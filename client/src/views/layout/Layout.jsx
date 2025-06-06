import React from 'react';
import { Menu } from './Menu';

export function Layout({ children }) {
    return (
        <>
        <header>
            <Menu />
        </header>
        <main>
            {children}
        </main>
        <footer></footer>
        </>
    )
}