import { useState } from 'react';

type AxisKey = 'safety' | 'comfort' | 'performance' | 'environment' | 'cost';

interface Product {
  label: string;
  brand: string;
  color: string;
  scores: Record<AxisKey, number>;
}

const products: Record<string, Product> = {
  naturella_pad: {
    label: 'Naturella Pad',
    brand: 'Naturella',
    color: '#2d8a4e',
    scores: { safety: 7.27, comfort: 5.0, performance: 5.88, environment: 0.0, cost: 1.97 },
  },
  always_platinum: {
    label: 'Always Platinum',
    brand: 'Always',
    color: '#4a7dc4',
    scores: { safety: 7.27, comfort: 5.0, performance: 8.55, environment: 0.0, cost: 0.0 },
  },
  ria_pad: {
    label: 'Ria Ultra Pad',
    brand: 'Ria',
    color: '#3a9b9b',
    scores: { safety: 7.27, comfort: 5.0, performance: 5.53, environment: 0.0, cost: 3.68 },
  },
  ria_tampon: {
    label: 'Ria Tampon',
    brand: 'Ria',
    color: '#b5569e',
    scores: { safety: 0.0, comfort: 4.0, performance: 5.55, environment: 5.0, cost: 5.53 },
  },
  ob_tampon: {
    label: 'o.b. Tampon',
    brand: 'o.b.',
    color: '#7c6db8',
    scores: { safety: 0.0, comfort: 4.0, performance: 5.26, environment: 6.67, cost: 1.25 },
  },
  jessa_cotton: {
    label: 'Jessa Cotton Pad',
    brand: 'Jessa',
    color: '#c97d3a',
    scores: { safety: 10.0, comfort: 7.5, performance: 6.96, environment: 3.33, cost: 1.12 },
  },
  jessa_cloth: {
    label: 'Jessa Cloth Pad',
    brand: 'Jessa',
    color: '#c94d58',
    scores: { safety: 7.27, comfort: 7.5, performance: 4.65, environment: 10.0, cost: 10.0 },
  },
};

const axes: { key: AxisKey; label: string }[] = [
  { key: 'safety', label: 'Safety' },
  { key: 'comfort', label: 'Comfort' },
  { key: 'performance', label: 'Performance' },
  { key: 'environment', label: 'Environment' },
  { key: 'cost', label: 'Cost' },
];

const presets: { label: string; weights: Record<AxisKey, number> }[] = [
  {
    label: 'Balanced',
    weights: { safety: 5, comfort: 5, performance: 5, environment: 5, cost: 5 },
  },
  {
    label: 'Health First',
    weights: { safety: 10, comfort: 9, performance: 5, environment: 2, cost: 2 },
  },
  {
    label: 'Performance',
    weights: { safety: 1, comfort: 1, performance: 10, environment: 1, cost: 1 },
  },
  {
    label: 'Eco and Budget',
    weights: { safety: 2, comfort: 2, performance: 2, environment: 10, cost: 10 },
  },
];

const defaultWeights: Record<AxisKey, number> = {
  safety: 5,
  comfort: 5,
  performance: 5,
  environment: 5,
  cost: 5,
};

function computeScores(weights: Record<AxisKey, number>) {
  const totalWeight = axes.reduce((s, a) => s + weights[a.key], 0) || 1;
  return (Object.keys(products) as string[])
    .map((key) => {
      const score = axes.reduce(
        (s, a) => s + (weights[a.key] / totalWeight) * products[key].scores[a.key],
        0,
      );
      return { key, score };
    })
    .sort((a, b) => b.score - a.score);
}

export default function RecommendTool() {
  const [weights, setWeights] = useState<Record<AxisKey, number>>(defaultWeights);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const ranked = computeScores(weights);
  const top3 = ranked.slice(0, 3);

  return (
    <div className="border border-stone-200 rounded-xl p-5 sm:p-6 shadow-sm">
      {/* Presets */}
      <div className="flex flex-wrap gap-2 mb-4">
        {presets.map(({ label, weights: pw }) => (
          <button
            type="button"
            key={label}
            onClick={() => {
              setWeights(pw);
              setActivePreset(label);
            }}
            className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
              activePreset === label
                ? 'bg-rose-500 text-white border-rose-500'
                : 'bg-white text-stone-600 border-stone-300 hover:border-rose-300 hover:text-rose-600'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Sliders */}
      <div className="space-y-3 mb-5">
        {axes.map(({ key, label }) => (
          <div key={key}>
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-sm font-medium text-stone-800">{label}</span>
              <span className="text-sm font-bold text-rose-500 w-5 text-right">{weights[key]}</span>
            </div>
            <input
              type="range"
              min={0}
              max={10}
              value={weights[key]}
              onChange={(e) => {
                setWeights((w) => ({ ...w, [key]: Number(e.target.value) }));
                setActivePreset(null);
              }}
              className="w-full accent-rose-500"
            />
          </div>
        ))}
      </div>

      {/* Top 3 */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
        {top3.map(({ key, score }, i) => (
          <div key={key} className="relative">
            {i === 0 && (
              <span className="absolute -top-2 left-2 text-[9px] font-bold tracking-wider uppercase bg-rose-500 text-white px-1.5 py-0.5 rounded-full">
                Best
              </span>
            )}
            <div
              className="rounded-xl p-3 sm:p-4 text-white"
              style={{ background: products[key].color }}
            >
              <p className="text-xs font-bold opacity-80">{i === 0 ? 'Best' : `#${i + 1}`}</p>
              <h4 className="text-xs sm:text-sm font-bold leading-tight mt-0.5">
                {products[key].label}
              </h4>
              <p className="text-[10px] sm:text-xs opacity-70 mt-1">{score.toFixed(2)}/10</p>
            </div>
          </div>
        ))}
      </div>

      {/* Full ranking */}
      <div className="space-y-1.5">
        {ranked.map(({ key, score }, i) => (
          <div key={key} className="flex items-center gap-2.5 text-sm">
            <span className="text-stone-400 text-xs font-bold w-4">{i + 1}</span>
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: products[key].color }}
            />
            <span className="text-stone-800 text-xs sm:text-sm flex-1 truncate">
              {products[key].label}
            </span>
            <div className="w-20 sm:w-32 bg-stone-100 rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full"
                style={{ width: `${(score / 10) * 100}%`, background: products[key].color }}
              />
            </div>
            <span className="text-stone-600 text-xs tabular-nums w-10 text-right">
              {score.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
