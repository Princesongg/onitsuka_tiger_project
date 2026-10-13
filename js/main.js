// Main landing interactions.
(() => {
    const motion = () => matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
    function initCarousel(id, selector) {
        const element = document.getElementById(id);
        const buttons = [...document.querySelectorAll(`button[aria-controls="${id}"]`)];
        const update = () => {
            buttons[0].disabled = element.scrollLeft <= 2;
            buttons[1].disabled = element.scrollLeft >= element.scrollWidth - element.clientWidth - 2;
        };
        const step = () => {
            const cards = element.querySelectorAll(selector);
            return cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : element.clientWidth;
        };
        buttons.forEach((button, index) => button.addEventListener('click', () => element.scrollBy({ left: (index ? 1 : -1) * step(), behavior: motion() })));
        element.addEventListener('keydown', event => {
            if (event.target !== element || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
            event.preventDefault();
            element.scrollBy({ left: (event.key === 'ArrowLeft' ? -1 : 1) * step(), behavior: motion() });
        });
        let drag = null, suppressClick = false;
        element.addEventListener('pointerdown', event => {
            suppressClick = false;
            if (event.pointerType === 'mouse' && event.button === 0) drag = { id: event.pointerId, x: event.clientX, scroll: element.scrollLeft, moved: false };
        });
        element.addEventListener('pointermove', event => {
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
        });
        const end = () => {
            if (!drag) return;
            suppressClick = drag.moved;
            const pointerId = drag.id;
            drag = null;
            if (element.hasPointerCapture(pointerId)) element.releasePointerCapture(pointerId);
            element.classList.remove('carousel--dragging');
        };
        window.addEventListener('pointerup', end);
        window.addEventListener('pointercancel', end);
        element.addEventListener('lostpointercapture', end);
        element.addEventListener('click', event => {
            if (suppressClick) { event.preventDefault(); event.stopPropagation(); suppressClick = false; }
        }, true);
        element.addEventListener('dragstart', event => event.preventDefault());
        element.addEventListener('scroll', update, { passive: true });
        const observer = new ResizeObserver(update);
        observer.observe(element);
        element.querySelectorAll(selector).forEach(card => observer.observe(card));
        element.classList.add('carousel--draggable');
        update();
    }
    initCarousel('con2-carousel', '.con2__card');
    initCarousel('con7-gallery', '.con7__card');
    initCarousel('con9-gallery', '.con9__card');
    document.querySelector('.back-to-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: motion() }));
    document.querySelector('.hero__search').addEventListener('submit', event => event.preventDefault());
    const main = document.querySelector('.con3__film--main video');
    const side = document.querySelector('.con3__film--side video');
    const sync = () => { if (side.readyState >= 1 && Math.abs(main.currentTime - side.currentTime) > .1) side.currentTime = main.currentTime; };
    main.addEventListener('timeupdate', sync);
    side.addEventListener('loadedmetadata', sync);
    document.querySelectorAll('video[autoplay]').forEach(video => { video.muted = true; video.play().catch(() => {}); });
    document.querySelector('.con1__skip').addEventListener('click', () => {
        const nextSection = document.querySelector('.con2');
        const trigger = window.ScrollTrigger?.getById('best-sellers-showcase');
        window.scrollTo({ top: nextSection.getBoundingClientRect().top + window.scrollY, behavior: 'instant' });
        window.ScrollTrigger?.update();
        trigger?.getTween()?.progress(1);
        trigger?.animation?.progress(1);
    });
})();

function initShowcase() {
    const shoes = [{"image":"mexico-yellow","name":"MEXICO 66","color":"YELLOW/BLACK","code":"1183C102.751","x":319,"y":192,"crop":true},{"image":"mexico-sd","name":"MEXICO 66 SD","color":"BIRCH/SILVER","code":"1183A592.200","x":883,"y":73,"crop":true},{"image":"gsm","name":"GSM","color":"CREAM/BLACK","code":"1183A353.127","x":1371,"y":325},{"image":"mexico-sabot","name":"MEXICO 66 SABOT","color":"BEIGE/GREEN","code":"1183C123.252","x":136,"y":671},{"image":"mexico-birch","name":"MEXICO 66","color":"BIRCH/PEACOAT","code":"1183C102.200","x":1418,"y":819},{"image":"mexico-vin","name":"MEXICO 66 SD VIN","color":"BEIGE/BEET JUICE","code":"1183C015.202","x":429,"y":1170},{"image":"mexico-silver","name":"MEXICO 66","color":"SILVER/OFF WHITE","code":"1183B566.021","x":1105,"y":1315}];
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
        const section = document.querySelector('.con1');
        const stage = section.querySelector('.con1__stage');
        const canvas = section.querySelector('.con1__canvas');
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
}
initShowcase();
