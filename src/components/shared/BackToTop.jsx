import './BackToTop.css';

export default function BackToTop() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        });
    };

    return (
        <button className="back-to-top" type="button" aria-label="페이지 맨 위로 이동" onClick={scrollToTop}>
            <span className="back-to-top__state back-to-top__state--default" aria-hidden="true">
                <img className="back-to-top__circle" src="/images/top/circle-default.svg" alt="" />
                <img className="back-to-top__arrow" src="/images/top/arrow-default.svg" alt="" />
                <span>TOP</span>
            </span>
            <span className="back-to-top__state back-to-top__state--hover" aria-hidden="true">
                <img className="back-to-top__circle" src="/images/top/circle-hover.svg" alt="" />
                <img className="back-to-top__arrow" src="/images/top/arrow-hover.svg" alt="" />
                <span>TOP</span>
            </span>
        </button>
    );
}
