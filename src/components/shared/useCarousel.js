import { useEffect, useRef, useState } from 'react';
import './CarouselNavigation.css';

export default function useCarousel(cardSelector) {
    const carouselRef = useRef(null);
    const [edges, setEdges] = useState({ start: true, end: false });

    useEffect(() => {
        const element = carouselRef.current;
        let drag = null;
        let suppressClick = false;
        const update = () => setEdges({ start: element.scrollLeft <= 2, end: element.scrollLeft >= element.scrollWidth - element.clientWidth - 2 });
        const down = event => {
            suppressClick = false;
            if (event.pointerType !== 'mouse' || event.button !== 0) return;
            drag = { id: event.pointerId, x: event.clientX, scroll: element.scrollLeft, moved: false };
        };
        const move = event => {
            if (!drag || event.pointerId !== drag.id) return;
            const distance = event.clientX - drag.x;
            if (!drag.moved && Math.abs(distance) < 6) return;
            if (!drag.moved) {
                drag.moved = true;
                element.classList.add('carousel--dragging');
                element.setPointerCapture(drag.id);
            }
            event.preventDefault();
            element.scrollLeft = drag.scroll - distance;
        };
        const end = () => {
            if (!drag) return;
            suppressClick = drag.moved;
            if (element.hasPointerCapture(drag.id)) element.releasePointerCapture(drag.id);
            drag = null;
            element.classList.remove('carousel--dragging');
        };
        const click = event => {
            if (suppressClick) { event.preventDefault(); event.stopPropagation(); suppressClick = false; }
        };
        const preventImageDrag = event => event.preventDefault();
        const observer = new ResizeObserver(update);
        observer.observe(element);
        element.querySelectorAll(cardSelector).forEach(card => observer.observe(card));
        element.addEventListener('scroll', update, { passive: true });
        element.addEventListener('pointerdown', down);
        element.addEventListener('pointermove', move);
        window.addEventListener('pointerup', end);
        window.addEventListener('pointercancel', end);
        element.addEventListener('lostpointercapture', end);
        element.addEventListener('click', click, true);
        element.addEventListener('dragstart', preventImageDrag);
        element.classList.add('carousel--draggable');
        update();
        return () => {
            observer.disconnect();
            element.removeEventListener('scroll', update);
            element.removeEventListener('pointerdown', down);
            element.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', end);
            window.removeEventListener('pointercancel', end);
            element.removeEventListener('lostpointercapture', end);
            element.removeEventListener('click', click, true);
            element.removeEventListener('dragstart', preventImageDrag);
            element.classList.remove('carousel--draggable', 'carousel--dragging');
        };
    }, [cardSelector]);

    const moveCarousel = direction => {
        const element = carouselRef.current;
        const cards = element.querySelectorAll(cardSelector);
        const step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : element.clientWidth;
        element.scrollBy({ left: direction * step, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    };
    return { carouselRef, edges, moveCarousel };
}
