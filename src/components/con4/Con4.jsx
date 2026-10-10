import { useEffect, useRef, useState } from 'react';
import '../con1/Con1.css';
import './Con4.css';

const products = [
    { image: 'cream', color: 'BIRCH/CAMEL BEIGE', code: '1183C736.201' },
    { image: 'brown', color: 'BROWN/BROWN', code: '1183C736.200' },
    { image: 'black', color: 'BLACK/BLACK', code: '1183C736.001' },
];
// Description summarized from the official 1183C736 product pages.
const description = '부드러운 양가죽과 스웨이드를 조합해 서로 다른 텍스처의 대비를 살린 TRAIRINA입니다. 같은 톤의 스티치로 표현한 타이거 스트라이프와 뒤꿈치까지 감싸는 낮은 밑창이 미니멀한 디자인에 개성을 더하고, 날렵한 실루엣을 완성합니다.';

export default function Con4() {
    const dialogRef = useRef(null);
    const [selected, setSelected] = useState(null);
    useEffect(() => {
        if (!selected) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = previousOverflow; };
    }, [selected]);

    const viewProduct = product => {
        setSelected(product);
        dialogRef.current.showModal();
    };

    return (
        <section className="con4" aria-labelledby="con4-title">
            <div className="con4__canvas">
                <div className="con4__tiger" aria-hidden="true"><img src="/images/con4/tiger.svg" alt="" /></div>
                <h2 id="con4-title">NEW ARRIVAL</h2>
                <div className="con4__cards">
                    {products.map(product => (
                        <article className="con4__card" key={product.code}>
                            <div className="con4__photo"><img src={`/images/con4/${product.image}.png`} alt={`TRAIRINA ${product.color}`} loading="lazy" /></div>
                            <div className="con4__info">
                                <p className="con4__brand">Onitsuka Tiger</p>
                                <h3>TRAIRINA</h3>
                                <p className="con4__price">₩260,000</p>
                                <p className="con4__color">{product.color}</p>
                                <p className="con4__code"># {product.code}</p>
                            </div>
                            <div className="con4__more" aria-hidden="true">
                                <span>VIEW MORE</span>
                                <div className="con4__more-arrow">
                                    <img className="con4__arrow-default" src="/images/con4/arrow.svg" alt="" />
                                    <img className="con4__arrow-hover" src="/images/con4/arrow-hover.svg" alt="" />
                                </div>
                            </div>
                            <button className="con4__trigger" type="button" onClick={() => viewProduct(product)} aria-label={`TRAIRINA ${product.color} 상세정보 보기`} aria-haspopup="dialog" />
                        </article>
                    ))}
                </div>
                <p className="con4__footer">TRAIRINA</p>
            </div>
            <dialog className="con1__dialog" ref={dialogRef} aria-labelledby="con4-detail-title" onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) dialogRef.current.close(); }}>
                {selected && <div className="con1__detail">
                    <button className="con1__detail-close" type="button" onClick={() => dialogRef.current.close()} aria-label="상품 설명 닫기" autoFocus>×</button>
                    <div className="con1__detail-copy">
                        <p className="con1__detail-category">유니섹스 신발</p>
                        <p className="con1__detail-brand">Onitsuka Tiger</p>
                        <h2 id="con4-detail-title">TRAIRINA</h2>
                        <p className="con1__detail-code">스타일 # {selected.code}</p>
                        <p className="con1__detail-description">{description}</p>
                        <details className="con1__detail-features">
                            <summary>상세정보와 특징</summary>
                            <ul><li>양가죽과 스웨이드 갑피</li><li>같은 톤의 스티치로 표현한 타이거 스트라이프</li><li>쿠셔닝을 위한 OrthoLite 인솔</li><li>여분의 신발끈 포함</li></ul>
                        </details>
                    </div>
                    <div className="con1__detail-photo con4__detail-photo"><img src={`/images/con4/${selected.image}.png`} alt={`TRAIRINA ${selected.color}`} /></div>
                    <div className="con1__detail-info">
                        <p className="con1__detail-color-label">컬러</p>
                        <p className="con1__detail-color">{selected.color}</p>
                        <p className="con1__detail-price">₩260,000</p>
                        <a className="con1__detail-link" href={`https://www.onitsukatiger.com/kr/ko-kr/product/trairina/${selected.code.toLowerCase()}`} target="_blank" rel="noopener noreferrer">공식 상품 보기 <span aria-hidden="true">↗</span></a>
                    </div>
                </div>}
            </dialog>
        </section>
    );
}
