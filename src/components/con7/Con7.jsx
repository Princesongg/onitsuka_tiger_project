import './Con7.css';
import useCarousel from '../shared/useCarousel';
import CarouselNavigation from '../shared/CarouselNavigation';

const clothes = [
    { image: 'wide-denim', name: 'WS WIDE DENIM PANTS', dark: true },
    { image: 'bomber-jacket', name: 'WS BOMBER JACKET' },
    { image: 'womens-shirt', name: "WOMEN'S SHIRT" },
    { image: 'mens-pants', name: 'MAN’S PANTS' },
    { image: 'womens-skirt', name: "WOMEN'S SKIRT", dark: true },
    { image: 'regular-denim', name: 'REGULAR DENIM PANTS', dark: true },
];

export default function Con7() {
    const { carouselRef, edges, moveCarousel } = useCarousel('.con7__card');
    return (
        <section className="con7" aria-labelledby="con7-title">
            <div className="con7__canvas">
                <div className="con7__tiger" aria-hidden="true">
                    <img src="/images/con7/tiger.svg" alt="" />
                </div>
                <div className="con7__gallery" id="con7-gallery" ref={carouselRef} tabIndex={0} role="region" aria-label="DENIVITA 의류 컬렉션 가로 스크롤">
                    {clothes.map(item => (
                        <article className={`con7__card${item.dark ? ' con7__card--dark-text' : ''}`} key={item.image}>
                            <img src={`/images/con7/${item.image}.png`} alt={item.name} loading="lazy" />
                            <div className="con7__label"><h3>{item.name}</h3></div>
                        </article>
                    ))}
                </div>
                <CarouselNavigation id="con7-gallery" edges={edges} move={moveCarousel} className="con7__navigation" />
                <h2 id="con7-title">DENIVITA</h2>
            </div>
        </section>
    );
}
