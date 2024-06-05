import { useEffect, useRef } from 'react';

export const useOutsideClick = (callback: (event: MouseEvent) => void) => {
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback(event);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [callback]);

    return ref;
};

export default useOutsideClick;
