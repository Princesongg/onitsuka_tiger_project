import './Con5.css';

export default function Con5() {
    return (
        <section className="con5" aria-label="DENIVITA × MOMO 캠페인">
            <div className="con5__canvas">
                <video
                    className="con5__video"
                    src="/video/DENIVITAｘMOMO_1.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-label="DENIVITA × MOMO 캠페인 영상"
                />
            </div>
        </section>
    );
}
