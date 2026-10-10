import './Con8.css';

export default function Con8() {
    return (
        <section className="con8" aria-labelledby="con8-title">
            <div className="con8__canvas">
                <div className="con8__tiger" aria-hidden="true">
                    <img src="/images/con8/tiger.svg" alt="" />
                </div>
                <div className="con8__photo con8__photo--top" aria-hidden="true">
                    <img src="/images/con8/bag.png" alt="" loading="lazy" />
                </div>
                <div className="con8__photo con8__photo--bottom">
                    <img src="/images/con8/bag.png" alt="오렌지색 스트랩과 체인이 달린 분홍색 Onitsuka Tiger 가방" loading="lazy" />
                </div>
                <h2 id="con8-title">BAG &amp; ACCESSORIES</h2>
            </div>
        </section>
    );
}
