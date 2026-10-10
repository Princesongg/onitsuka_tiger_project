import './Con6.css';

export default function Con6() {
    return (
        <section className="con6" aria-labelledby="con6-title">
            <div className="con6__canvas">
                <div className="con6__tiger" aria-hidden="true">
                    <img src="/images/con6/tiger.svg" alt="" />
                </div>
                <img className="con6__photo con6__photo--left" src="/images/con6/momo-left.png" alt="DENIVITA 의상을 입고 누워 있는 MOMO" loading="lazy" />
                <img className="con6__photo con6__photo--right" src="/images/con6/momo-right.png" alt="MOMO가 착용한 보라색 DENIVITA 의상" loading="lazy" />
                <div className="con6__title">
                    <h2 id="con6-title">MOMO &amp; DENIVITA</h2>
                </div>
            </div>
        </section>
    );
}
