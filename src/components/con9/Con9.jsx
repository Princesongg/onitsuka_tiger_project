import { useEffect, useRef, useState } from 'react';
import './Con9.css';
import useCarousel from '../shared/useCarousel';
import CarouselNavigation from '../shared/CarouselNavigation';
import { accessoryColors } from './accessoryColors';

const products = [
    { image: 'socks', name: 'MIDDLE SOCKS', price: '₩20,000', description: '타이거 모티브를 더한 미들 길이의 양말입니다. 발목 위로 올라오는 길이와 골지 디자인으로 스니커즈 스타일링에 포인트를 더합니다.' },
    { image: 'beanie', name: 'BEANIE', price: '₩100,000', description: '보송한 표면감이 돋보이는 비니입니다. 밝은 색상의 브랜드 레터링이 대비를 이루며, 캐주얼한 옷차림에 포인트를 더합니다.' },
    { image: 'tote-bag', name: 'SMALL CANVAS TOTE BAG', price: '₩220,000', description: '바탕과 손잡이·바닥의 배색이 돋보이는 캔버스 토트백입니다. 앞면의 브랜드 자수와 타이거 참이 포인트이며, 탈부착 가능한 숄더 스트랩으로 손에 들거나 어깨에 멜 수 있습니다. 지퍼 여밈과 내부 포켓을 갖춰 소지품을 정리하기 좋습니다.' },
    { image: 'small-shoulder-bag', name: 'WS SMALL SHOULDER BAG', price: '₩170,000', description: '빈티지 감성의 에나멜 소재와 배색이 돋보이는 작은 숄더백입니다. 탈부착 가능한 어깨 스트랩으로 두 가지 방식으로 연출할 수 있으며, 실버 컬러의 금속 장식이 디자인을 완성합니다.' },
    { image: 'shoulder-bag', name: 'SHOULDER BAG', price: '₩250,000', description: '부드럽게 떨어지는 형태와 블랙 컬러가 어우러진 숄더백입니다. 곡선형 실루엣과 간결한 디자인으로 다양한 데일리 스타일에 매치하기 좋습니다.' },
    { image: 'cap', name: 'CAP', price: '₩140,000', description: '작은 타이거 자수로 포인트를 준 캡입니다. 둥근 크라운과 곡선형 챙으로 이루어진 클래식한 디자인으로, 캐주얼한 옷차림과 자연스럽게 어울립니다.' },
];

export default function Con9() {
    const { carouselRef, edges, moveCarousel } = useCarousel('.con9__card');
    const [selected, setSelected] = useState(null);
    const [colorIndex, setColorIndex] = useState(0);
    const colors = selected ? accessoryColors[selected.image] : [];
    const selectedColor = colors[colorIndex] ?? colors[0];
    const dialogRef = useRef(null);

    useEffect(() => {
        if (!selected) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        dialogRef.current.showModal();
        return () => { document.body.style.overflow = previousOverflow; };
    }, [selected]);

    return (
        <section className="con9" aria-labelledby="con9-title">
            <div className="con9__canvas">
                <div className="con9__tiger" aria-hidden="true"><img src="/images/con7/tiger.svg" alt="" /></div>
                <div className="con9__gallery" id="con9-gallery" ref={carouselRef} tabIndex={0} role="region" aria-label="액세서리 상품 가로 스크롤">
                    {products.map(product => (
                        <article className="con9__card" key={product.image}>
                            <div className={`con9__photo con9__photo--${product.image}`}>
                                <img src={`/images/con9/${product.image}.png`} alt={product.name} loading="lazy" />
                            </div>
                            <div className="con9__info">
                                <p className="con9__brand">Onitsuka Tiger</p>
                                <h3>{product.name}</h3>
                                <p className="con9__price">{product.price}</p>
                            </div>
                            <button className="con9__more" type="button" onClick={() => { setColorIndex(0); setSelected(product); }} aria-label={`${product.name} 자세히 보기`} aria-haspopup="dialog">
                                <span>VIEW MORE</span>
                                <span className="con9__arrow" aria-hidden="true">
                                    <img className="con9__arrow-default" src="/images/con4/arrow.svg" alt="" />
                                    <img className="con9__arrow-hover" src="/images/con4/arrow-hover.svg" alt="" />
                                </span>
                            </button>
                        </article>
                    ))}
                </div>
                <CarouselNavigation id="con9-gallery" edges={edges} move={moveCarousel} className="con9__navigation" />
                <h2 id="con9-title">Onitsuka Accessories</h2>
            </div>
            <dialog className="con9__dialog" ref={dialogRef} aria-labelledby="con9-detail-title" onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) dialogRef.current.close(); }}>
                {selected && <div className="con9__detail">
                    <button className="con9__close" type="button" onClick={() => dialogRef.current.close()} aria-label="상품 정보 닫기" autoFocus>×</button>
                    <img src={selectedColor.image} alt={`${selected.name} ${selectedColor.name}`} />
                    <p className="con9__brand">Onitsuka Tiger</p>
                    <h2 id="con9-detail-title">{selected.name}</h2>
                    <p className="con9__price">{selected.price}</p>
                    <p className="con9__selected-color">{selectedColor.name}</p>
                    <div className="con9__color-options" role="group" aria-label="상품 컬러 선택">
                        {colors.map((color, index) => <button key={color.name} type="button" aria-label={`${color.name} 컬러 보기`} aria-pressed={index === colorIndex} onClick={() => setColorIndex(index)}>
                            <img src={color.image} alt="" />
                        </button>)}
                    </div>
                    <p className="con9__description">{selected.description}</p>
                </div>}
            </dialog>
        </section>
    );
}
