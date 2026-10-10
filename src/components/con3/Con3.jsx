import { useEffect, useRef } from 'react';
import './Con3.css';

export default function Con3() {
    const mainVideo = useRef(null);
    const sideVideo = useRef(null);

    useEffect(() => {
        const main = mainVideo.current;
        const side = sideVideo.current;
        const sync = () => {
            if (side.readyState >= 1 && Math.abs(main.currentTime - side.currentTime) > .1) {
                side.currentTime = main.currentTime;
            }
        };
        main.addEventListener('timeupdate', sync);
        side.addEventListener('loadedmetadata', sync);
        return () => {
            main.removeEventListener('timeupdate', sync);
            side.removeEventListener('loadedmetadata', sync);
        };
    }, []);

    return (
        <section className="con3" aria-labelledby="con3-title">
            <div className="con3__canvas">
                <div className="con3__film con3__film--main" aria-hidden="true">
                    <video ref={mainVideo} src="/video/con3_trairina.mp4" autoPlay muted loop playsInline />
                </div>
                <div className="con3__film con3__film--side" aria-hidden="true">
                    <video ref={sideVideo} src="/video/con3_trairina.mp4" autoPlay muted loop playsInline />
                </div>
                <img className="con3__frame" src="/images/con3/trairina.png" alt="" aria-hidden="true" />
                <div className="con3__copy">
                    <p className="con3__new">NEW</p>
                    <h2 id="con3-title">TRAIRINA</h2>
                    <p className="con3__description">레이어드된 텍스처, 가벼운 실루엣</p>
                </div>
                <div className="con3__tiger" aria-hidden="true">
                    <img src="/images/con3/tiger.svg" alt="" />
                </div>
            </div>
        </section>
    );
}
