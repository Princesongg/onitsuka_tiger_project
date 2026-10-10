import useCarousel from '../shared/useCarousel';
import { useRef, useState } from 'react';
import './Con2.css';
import ModelCard from './ModelCard';
import { models } from './modelProducts';

export default function Con2() {
    const dialogRef = useRef(null);
    const { carouselRef, edges: scrollEdges, moveCarousel } = useCarousel('.con2__card');
    const [selectedModel, setSelectedModel] = useState(null);

    const viewModel = (model) => {
        setSelectedModel(model);
        dialogRef.current.showModal();
    };

    return (
        <section className="con2" aria-labelledby="con2-title">
            <div className="con2__inner">
                <header className="con2__header">
                    <div className="con2__tiger" aria-hidden="true"><img src="/images/con2/tiger.svg" alt="" /></div>
                    <h2 id="con2-title">EXPLORE BY MODEL</h2>
                </header>
                <div className="con2__carousel" id="con2-carousel" ref={carouselRef} tabIndex={0} aria-label="모델 목록, 좌우로 스크롤하여 확인" role="region">
                    <div className="con2__track">
                        {models.map((model, index) => (
                            <article className="con2__card" key={model.id}>
                                <div className={`con2__image${index === 0 ? ' con2__image--cropped' : ''}`}>
                                    <img src={`/images/con2/${model.id}.png`} alt={model.name} loading="lazy" />
                                </div>
                                <div className="con2__details">
                                    <p className="con2__brand">Onitsuka Tiger</p>
                                    <h3>{model.name}</h3>
                                    <p className="con2__price">{model.price}</p>
                                </div>
                                <button className="con2__colors" type="button" onClick={() => viewModel(model)} aria-label={`${model.name} 색상 보기`} aria-haspopup="dialog">
                                    <span>VIEW ALL COLORS</span>
                                    <span className="con2__arrows" aria-hidden="true"><img className="con2__arrow" src="/images/con2/arrow.svg" alt="" /><img className="con2__arrow con2__arrow--hover" src="/images/con2/arrow-hover.svg" alt="" /></span>
                                </button>
                            </article>
                        ))}
                    </div>
                </div>
                <div className="con2__navigation" aria-label="모델 목록 이동">
                    <button type="button" aria-label="이전 모델" aria-controls="con2-carousel" disabled={scrollEdges.start} onClick={() => moveCarousel(-1)}>
                        <svg className="con2__navigation-arrow con2__navigation-arrow--previous" viewBox="0 0 36 12" fill="none" aria-hidden="true">
                            <path d="M2 10H34L24 2" />
                        </svg>
                    </button>
                    <button type="button" aria-label="다음 모델" aria-controls="con2-carousel" disabled={scrollEdges.end} onClick={() => moveCarousel(1)}>
                        <svg className="con2__navigation-arrow" viewBox="0 0 36 12" fill="none" aria-hidden="true">
                            <path d="M2 10H34L24 2" />
                        </svg>
                    </button>
                </div>
                <p className="con2__footer">FOOTWEARS</p>
            </div>
            <dialog className="con2__dialog" ref={dialogRef} onClose={() => setSelectedModel(null)} onClick={event => { if (event.target === event.currentTarget) dialogRef.current.close(); }} aria-labelledby="con2-model-title">
                <div className="con2__preview">
                    <button className="con2__close" type="button" onClick={() => dialogRef.current.close()} aria-label="닫기">×</button>
                    {selectedModel && <ModelCard key={selectedModel.id} model={selectedModel} />}
                </div>
            </dialog>
        </section>
    );
}


