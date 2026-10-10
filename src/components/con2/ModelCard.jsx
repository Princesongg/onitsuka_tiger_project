import { useState } from 'react';
import { modelDescriptions } from './modelDescriptions';

export default function ModelCard({ model }) {
    const [colorIndex, setColorIndex] = useState(0);
    const color = model.colors[colorIndex];

    return (
        <article className="con2__color-card">
            <div className="con2__popup-image">
                <img src={color.image} alt={`${model.name} ${color.name}`} loading="lazy" />
            </div>
            <div className="con2__popup-details">
                <p className="con2__popup-brand">Onitsuka Tiger</p>
                <h3 id="con2-model-title">{model.name}</h3>
                <p className="con2__popup-price">{model.price}</p>
                <p className="con2__popup-color">{color.name}</p>
            </div>
            <div className="con2__color-options" aria-label={`${model.name} 색상 선택`}>
                {model.colors.map((option, index) => (
                    <button key={option.sku} type="button" aria-label={option.name} title={option.name} aria-pressed={index === colorIndex} onClick={() => setColorIndex(index)}>
                        <img src={option.image} alt="" loading="lazy" />
                    </button>
                ))}
            </div>
            <p className="con2__popup-description">{modelDescriptions[model.id]}</p>
            <a className="con2__more" href={color.url} target="_blank" rel="noopener noreferrer" aria-label={`${model.name} ${color.name} 공식 상품 보기`}>MORE</a>
        </article>
    );
}
