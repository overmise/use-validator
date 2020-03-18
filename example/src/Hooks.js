import { useCallback, useEffect } from 'react'

export const useEscape = (fn) => {
    const escape = useCallback((event) => {
        if (event.keyCode === 27) {
            fn(event)
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', escape, false);

        return () => {
            document.removeEventListener('keydown', escape, false);
        };
    }, []);
}
