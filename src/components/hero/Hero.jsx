import './Hero.css';

export default function Hero({ videoSrc = '/video/hero_nippon%20made.mp4', poster }) {
    return (
        <section className="hero" aria-labelledby="hero-title">
            <div className="hero__frame">
                {videoSrc && <video className="hero__video" src={videoSrc} poster={poster} autoPlay muted loop playsInline aria-hidden="true" />}
                <header className="hero__header">
                    <nav className="hero__nav" aria-label="주 메뉴">
                        <span>MENU</span>
                        <span>MAGAZINE</span>
                        <span>BRAND</span>
                    </nav>
                    <div className="hero__logo-tools">
                    <a className="hero__logo" href="/" aria-label="Onitsuka Tiger 홈">
                        <img src="/images/hero/logo.png" alt="Onitsuka Tiger" width="128" height="75" />
                    </a>
                    <div className="hero__tools">
                        <form className="hero__search" role="search" onSubmit={(event) => event.preventDefault()}>
                            <img src="/images/hero/search.svg" alt="" aria-hidden="true" />
                            <input name="q" type="search" aria-label="상품 검색" />
                            <button type="submit" aria-label="검색" />
                        </form>
                        <span className="hero__bag"><img src="/images/hero/bag.svg" alt="장바구니" /></span>
                        <span className="hero__account"><img src="/images/hero/account.svg" alt="로그인" /></span>
                    </div>
                    </div>
                </header>
                <div className="hero__copy"><h1 id="hero-title">Onitsuka Tiger</h1><p>INNOVATIVE FACTORY</p></div>
            </div>
        </section>
    );
}


