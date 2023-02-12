import { useState, useEffect } from "react";

export function useLocalStorage(key) {
    const [value, setValue] = useState();
    useEffect(() => {
        const stored = localStorage.getItem(key) || {};
        setValue(stored ? JSON.parse(stored) : '');
    }, [key]);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}