import './CarouselNavigation.css';

export default function CarouselNavigation({ id, edges, move, className = '' }) {
    return <div className={`carousel-navigation ${className}`} aria-label="카드 목록 이동">
        {[-1, 1].map(direction => <button key={direction} type="button" aria-label={direction < 0 ? '이전 카드' : '다음 카드'} aria-controls={id} disabled={direction < 0 ? edges.start : edges.end} onClick={() => move(direction)}>
            <svg className={direction < 0 ? 'carousel-navigation__previous' : ''} viewBox="0 0 36 12" fill="none" aria-hidden="true"><path d="M2 10H34L24 2" /></svg>
        </button>)}
    </div>;
}
