import './Con1.css';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { shoeDetails } from './shoeDetails';

gsap.registerPlugin(ScrollTrigger);

const shoes = [
    { image: 'mexico-yellow', name: 'MEXICO 66', color: 'YELLOW/BLACK', code: '1183C102.751', x: 319, y: 192, crop: true },
    { image: 'mexico-sd', name: 'MEXICO 66 SD', color: 'BIRCH/SILVER', code: '1183A592.200', x: 883, y: 73, crop: true },
    { image: 'gsm', name: 'GSM', color: 'CREAM/BLACK', code: '1183A353.127', x: 1371, y: 325 },
    { image: 'mexico-sabot', name: 'MEXICO 66 SABOT', color: 'BEIGE/GREEN', code: '1183C123.252', x: 136, y: 671 },
    { image: 'mexico-birch', name: 'MEXICO 66', color: 'BIRCH/PEACOAT', code: '1183C102.200', x: 1418, y: 819 },
    { image: 'mexico-vin', name: 'MEXICO 66 SD VIN', color: 'BEIGE/BEET JUICE', code: '1183C015.202', x: 429, y: 1170 },
    { image: 'mexico-silver', name: 'MEXICO 66', color: 'SILVER/OFF WHITE', code: '1183B566.021', x: 1105, y: 1315 },
];

export default function Con1() {

    const sectionRef = useRef(null);
    const stageRef = useRef(null);
    const canvasRef = useRef(null);
    const dialogRef = useRef(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const stage = stageRef.current;
        const canvas = canvasRef.current;
        const media = gsap.matchMedia();
        let disposed = false;
        media.add({ mobile: '(max-width: 600px)', desktop: '(min-width: 601px)' }, context => {
            const { mobile } = context.conditions;
            const products = Array.from(canvas.querySelectorAll('.con1__product'));
            const heading = canvas.querySelector('.con1__heading');
            const ui = stage.querySelector('.con1__showcase-ui');
            const skip = stage.querySelector('.con1__skip');
            const slotInfo = Array.from(ui.querySelectorAll('.con1__slot-info'));
            const focusInfo = Array.from(ui.querySelectorAll('.con1__focus-info'));
            const viewportHeight = () => document.documentElement.clientHeight;
            const slots = mobile
                ? [[.25, .18], [.50, .08], [.75, .18], [.14, .42], [.86, .42], [.20, .66], [.80, .66]]
                : [[.25, .18], [.50, .08], [.75, .18], [.12, .42], [.88, .42], [.22, .66], [.78, .66]];
            const photoOf = product => product.querySelector('.con1__image');
            const restingScale = product => Math.min(mobile ? 0.58 : 0.68,
                canvas.clientWidth * (mobile ? 0.19 : 0.18) / photoOf(product).offsetWidth,
                viewportHeight() * 0.12 / photoOf(product).offsetHeight);
            const heroScale = product => {
                const photo = photoOf(product);
                const angle = 7 * Math.PI / 180;
                // Bound the rotated image to its own reserved area, including short viewports.
                return Math.min(mobile ? 1.5 : 1.65,
                    canvas.clientWidth * (mobile ? 0.65 : 0.44) / (photo.offsetWidth * Math.cos(angle) + photo.offsetHeight * Math.sin(angle)),
                    viewportHeight() * 0.46 / (photo.offsetHeight * Math.cos(angle) + photo.offsetWidth * Math.sin(angle)));
            };
            const offset = (product, index, axis, center = false) => {
                const photo = photoOf(product);
                const destination = axis === 'x'
                    ? canvas.clientWidth * (center ? 0.5 : slots[index][0])
                    : viewportHeight() * (center ? 0.36 : slots[index][1]);
                const origin = axis === 'x'
                    ? product.offsetLeft + photo.offsetLeft + photo.offsetWidth / 2
                    : product.offsetTop + photo.offsetTop + photo.offsetHeight / 2;
                return destination - origin;
            };
            const timeline = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
            const compose = () => {
                timeline.clear();
                const intro = 0.85;
                products.forEach((product, index) => {
                    const photo = photoOf(product);
                    const copy = product.querySelectorAll('h3, .con1__color, .con1__code');
                    slotInfo[index].style.left = slots[index][0] * 100 + '%';
                    slotInfo[index].style.top = (slots[index][1] + 0.075) * 100 + '%';
                    timeline.fromTo(product, { x: 0, y: 0 }, {
                        x: () => offset(product, index, 'x'), y: () => offset(product, index, 'y'),
                        duration: intro, immediateRender: false,
                    }, 0)
                        .fromTo(photo, { scale: 1, rotation: 0, opacity: 1, filter: 'blur(0px) brightness(1)' }, {
                            scale: () => restingScale(product), rotation: 0, duration: intro, immediateRender: false,
                        }, 0)
                        // Original labels stay in the untouched initial layout. The showcase
                        // uses independent, unscaled information layers during the pinned scene.
                        .fromTo(copy, { opacity: 1 }, { opacity: 0, duration: intro * 0.5, immediateRender: false }, 0);
                });
                timeline.fromTo(heading, { opacity: 1 }, { opacity: 0, duration: intro, immediateRender: false }, 0)
                    .fromTo(ui, { autoAlpha: 0 }, { autoAlpha: 1, duration: intro, immediateRender: false }, 0)
                    .fromTo(skip, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, immediateRender: false }, intro);
                products.forEach((product, index) => {
                    const photo = photoOf(product);
                    const start = intro + index * 1.8;
                    const peak = start + 0.65;
                    const returnAt = peak + 0.3;
                    const background = products.filter(item => item !== product);
                    background.forEach(other => {
                        const image = photoOf(other);
                        timeline.fromTo(image, { scale: () => restingScale(other), opacity: 1, filter: 'blur(0px) brightness(1)' }, {
                            scale: () => restingScale(other) * 0.95, opacity: 0.55,
                            filter: mobile ? 'blur(1.5px) brightness(0.82)' : 'blur(2.5px) brightness(0.8)',
                            duration: 0.65, immediateRender: false,
                        }, start)
                            .to(image, { scale: () => restingScale(other), opacity: 1, filter: 'blur(0px) brightness(1)', duration: 0.65 }, returnAt);
                    });
                    const backgroundLabels = slotInfo.filter((_, item) => item !== index);
                    timeline.fromTo(backgroundLabels, { opacity: 1 }, { opacity: 0.65, duration: 0.65, immediateRender: false }, start)
                        .to(backgroundLabels, { opacity: 1, duration: 0.65 }, returnAt)
                        .fromTo(slotInfo[index], { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.3, immediateRender: false }, start)
                        .fromTo(focusInfo[index], { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.12, immediateRender: false }, peak - 0.06)
                        .to(focusInfo[index], { autoAlpha: 0, y: -8, duration: 0.1 }, returnAt)
                        .to(slotInfo[index], { autoAlpha: 1, duration: 0.3 }, returnAt + 0.3)
                        .addLabel('shoe-' + shoes[index].image, start)
                        .fromTo(product, { x: () => offset(product, index, 'x'), y: () => offset(product, index, 'y'), zIndex: 1 }, {
                            x: () => offset(product, index, 'x', true), y: () => offset(product, index, 'y', true),
                            zIndex: 4, duration: 0.65, immediateRender: false,
                        }, start)
                        .fromTo(photo, { scale: () => restingScale(product), rotation: 0 }, {
                            scale: () => heroScale(product), rotation: index % 2 ? 7 : -7, duration: 0.65, immediateRender: false,
                        }, start)
                        .to(product, { x: () => offset(product, index, 'x'), y: () => offset(product, index, 'y'), zIndex: 1, duration: 0.65 }, returnAt)
                        .to(photo, { scale: () => restingScale(product), rotation: 0, duration: 0.65 }, returnAt);
                    timeline.addLabel('shoe-' + shoes[index].image + '-peak', peak);
                });
                const outro = intro + products.length * 1.8;
                timeline.addLabel('restore-layout', outro)
                    .to(products, { x: 0, y: 0, zIndex: 1, duration: 0.85 }, outro)
                    .to(products.map(photoOf), { scale: 1, rotation: 0, opacity: 1, filter: 'blur(0px) brightness(1)', duration: 0.85 }, outro)
                    .to(products.flatMap(product => Array.from(product.querySelectorAll('h3, .con1__color, .con1__code'))), { opacity: 1, duration: 0.85 }, outro)
                    .to(heading, { opacity: 1, duration: 0.85 }, outro)
                    .to(ui, { autoAlpha: 0, duration: 0.85 }, outro)
                    .to(skip, { autoAlpha: 0, duration: 0.2 }, outro);
            };
            compose();
            const trigger = ScrollTrigger.create({
                id: 'best-sellers-showcase', trigger: section, pin: stage,
                animation: timeline, start: 'top top',
                end: () => '+=' + viewportHeight() * (mobile ? 6.5 : 7.5),
                scrub: 0.6, pinSpacing: true, anticipatePin: 1, invalidateOnRefresh: true,
                onRefreshInit: compose,
            });
            return () => trigger.kill();
        }, section);
        // Loaded fonts and assets can affect mobile grid measurements.
        const refresh = () => { if (!disposed) ScrollTrigger.refresh(); };
        const images = Array.from(canvas.querySelectorAll('img'));
        images.forEach(image => image.addEventListener('load', refresh));
        document.fonts.ready.then(refresh);
        return () => {
            disposed = true;
            images.forEach(image => image.removeEventListener('load', refresh));
            media.revert();
        };
    }, []);


    const [selectedShoe, setSelectedShoe] = useState(null);
    const details = selectedShoe ? shoeDetails[selectedShoe.code] : null;
    useEffect(() => {
        if (!selectedShoe) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = previousOverflow; };
    }, [selectedShoe]);
    const viewShoe = shoe => {
        setSelectedShoe(shoe);
        dialogRef.current.showModal();
    };
    const skipShowcase = () => {
        const nextSection = sectionRef.current.nextElementSibling;
        if (!nextSection) return;
        // Skip directly rather than rapidly playing all seven scrubbed scenes.
        const trigger = ScrollTrigger.getById('best-sellers-showcase');
        window.scrollTo({ top: nextSection.getBoundingClientRect().top + window.scrollY, behavior: 'instant' });
        ScrollTrigger.update();
        trigger?.getTween()?.progress(1);
        trigger?.animation?.progress(1);
    };
    return (
        <section className="con1" ref={sectionRef} aria-labelledby="con1-title">
            <div className="con1__stage" ref={stageRef}>
                <button className="con1__skip" type="button" aria-label="BEST SELLERS 애니메이션 건너뛰고 다음 섹션으로 이동" onClick={skipShowcase}>
                    <img src="/images/top/arrow-default.svg" alt="" aria-hidden="true" />
                </button>
                <div className="con1__canvas" ref={canvasRef}>
                    <div className="con1__tiger" aria-hidden="true"><img src="/images/con1/tiger.svg" alt="" /></div>
                    <div className="con1__heading">
                        <img className="con1__logo" src="/images/con1/logo-yellow.png" alt="Onitsuka Tiger" width="225" height="132" />
                        <h2 id="con1-title">BEST SELLERS</h2>
                        <p>FOOTWEAR</p>
                    </div>
                    <div className="con1__products">
                        {shoes.map(shoe => (
                            <article className="con1__product" key={shoe.image}
                                style={{ '--shoe-x': `${shoe.x / 1920 * 100}%`, '--shoe-y': `${shoe.y / 1800 * 100}%` }}>
                                <div className={`con1__image${shoe.crop ? ' con1__image--cropped' : ''}${shoe.image === 'gsm' ? ' con1__image--cover' : ''}`}>
                                    <img className="con1__shoe" src={`/images/con1/${shoe.image}-figma${shoe.image === 'mexico-sabot' ? '-v2' : ''}.png`} alt={`${shoe.name} ${shoe.color}`} loading="lazy" />
                                </div>
                                <h3>{shoe.name}</h3>
                                <p className="con1__color">{shoe.color}</p>
                                <p className="con1__code"># {shoe.code}</p>
                                <button className="con1__product-trigger" type="button" onClick={() => viewShoe(shoe)} aria-label={`${shoe.name} ${shoe.color} 상품 설명 보기`} aria-haspopup="dialog" />
                            </article>
                        ))}
                    </div>
                </div>
                <div className="con1__showcase-ui" aria-hidden="true">
                    <div className="con1__surrounding-info">
                        {shoes.map(shoe => <div className="con1__slot-info" key={shoe.code}>
                            <p className="con1__slot-name">{shoe.name}</p>
                            <p>{shoe.color}</p><p># {shoe.code}</p>
                        </div>)}
                    </div>
                    <div className="con1__central-flow">
                        <div className="con1__focus-region">
                            {shoes.map(shoe => <div className="con1__focus-info" key={shoe.code}>
                                <p className="con1__focus-name">{shoe.name}</p>
                                <p className="con1__focus-color">{shoe.color}</p>
                                <p className="con1__focus-code"># {shoe.code}</p>
                            </div>)}
                        </div>
                        <div className="con1__brand-region">
                            <img src="/images/con1/logo-yellow.png" alt="" />
                            <p className="con1__brand-title">BEST SELLERS</p>
                            <p className="con1__brand-category">FOOTWEAR</p>
                        </div>
                    </div>
                </div>
            </div>
            <dialog className="con1__dialog" ref={dialogRef} aria-labelledby="con1-detail-title" onClose={() => setSelectedShoe(null)} onClick={event => { if (event.target === event.currentTarget) dialogRef.current.close(); }}>
                {selectedShoe && <div className="con1__detail">
                    <button className="con1__detail-close" type="button" onClick={() => dialogRef.current.close()} aria-label="상품 설명 닫기" autoFocus>×</button>
                    <div className="con1__detail-copy">
                        <p className="con1__detail-category">유니섹스 신발</p>
                        <p className="con1__detail-brand">Onitsuka Tiger</p>
                        <h2 id="con1-detail-title">{selectedShoe.name}</h2>
                        <p className="con1__detail-code">스타일 # {selectedShoe.code}</p>
                        <p className="con1__detail-description">{details.description}</p>
                        <details className="con1__detail-features">
                            <summary>상세정보와 특징</summary>
                            <ul>{details.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
                        </details>
                    </div>
                    <div className="con1__detail-photo">
                        <div className={`con1__image${selectedShoe.crop ? ' con1__image--cropped' : ''}${selectedShoe.image === 'gsm' ? ' con1__image--cover' : ''}`}>
                            <img src={`/images/con1/${selectedShoe.image}.png`} alt={`${selectedShoe.name} ${selectedShoe.color}`} />
                        </div>
                    </div>
                    <div className="con1__detail-info">
                        <p className="con1__detail-color-label">컬러</p>
                        <p className="con1__detail-color">{selectedShoe.color}</p>
                        <p className="con1__detail-price">{details.price}</p>
                        <a className="con1__detail-link" href={`https://www.onitsukatiger.com/kr/ko-kr/product/${details.slug}/${selectedShoe.code.toLowerCase()}`} target="_blank" rel="noopener noreferrer">공식 상품 보기 <span aria-hidden="true">↗</span></a>
                    </div>
                </div>}
            </dialog>
        </section>
    );
}









