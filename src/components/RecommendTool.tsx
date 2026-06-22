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

const axes: { key: AxisKey; label: string; description: string }[] = [
  { key: 'safety', label: 'Safety', description: 'TSS, bacterial, chemical' },
  { key: 'comfort', label: 'Comfort', description: 'Skin irritation, breathability' },
  { key: 'performance', label: 'Performance', description: 'Absorption capacity and rate' },
  { key: 'environment', label: 'Environment', description: 'Waste, biodegradability' },
  { key: 'cost', label: 'Cost', description: 'Annual spend' },
];

const presets: { label: string; desc: string; weights: Record<AxisKey, number> }[] = [
  {
    label: 'Balanced',
    desc: 'All axes equal',
    weights: { safety: 5, comfort: 5, performance: 5, environment: 5, cost: 5 },
  },
  {
    label: 'Health First',
    desc: 'Safety and comfort first',
    weights: { safety: 10, comfort: 9, performance: 5, environment: 2, cost: 2 },
  },
  {
    label: 'Performance',
    desc: 'Absorption matters most',
    weights: { safety: 1, comfort: 1, performance: 10, environment: 1, cost: 1 },
  },
  {
    label: 'Eco and Budget',
    desc: 'Environment and cost first',
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
  const winner = ranked[0];
  const top3 = ranked.slice(0, 3);
  const totalWeight = axes.reduce((s, a) => s + weights[a.key], 0) || 1;

  return (
    <div className="border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm">
      <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-1">Recommendation Tool</h3>
      <p className="text-sm text-stone-500 mb-5">
        Drag the sliders to match your priorities. The tool re-ranks all seven products using the
        group's research data.
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {presets.map(({ label, desc, weights: pw }) => {
          const isActive = activePreset === label;
          return (
            <button
              type="button"
              key={label}
              onClick={() => {
                setWeights(pw);
                setActivePreset(label);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 ${
                isActive
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-white text-stone-700 border-stone-300 hover:border-rose-300 hover:text-rose-600'
              }`}
              title={desc}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="space-y-5 mb-6">
        {axes.map(({ key, label, description }) => (
          <div key={key}>
            <div className="flex justify-between items-baseline mb-2">
              <div>
                <span className="text-sm sm:text-base font-semibold text-stone-900">{label}</span>
                <span className="ml-2 text-xs sm:text-sm text-stone-500">{description}</span>
              </div>
              <span className="text-base font-bold text-rose-500 w-6 text-right">
                {weights[key]}
              </span>
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
              className="w-full accent-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
            />
            <div className="flex justify-between text-xs text-stone-400 mt-0.5">
              <span>Not important</span>
              <span>Most important</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mb-4">
        {top3.map(({ key, score }, i) => (
          <div key={key} className="relative">
            {i === 0 && (
              <span className="absolute -top-2 left-3 text-[10px] sm:text-xs font-bold tracking-wider uppercase bg-rose-500 text-white px-2 py-0.5 rounded-full">
                Best match
              </span>
            )}
            <div
              className="rounded-2xl p-5 text-white h-full"
              style={{ background: products[key].color }}
            >
              <p className="text-sm font-bold opacity-80 mb-1">
                {i === 0 ? 'Best match' : `#${i + 1}`}
              </p>
              <h4 className="text-lg sm:text-xl font-bold mb-0.5">{products[key].label}</h4>
              <p className="text-xs sm:text-sm opacity-70">{products[key].brand}</p>
              <p className="text-xs sm:text-sm opacity-70 mt-1.5">Score: {score.toFixed(2)} / 10</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border border-stone-200 rounded-xl overflow-hidden">
        <div className="px-5 py-3 bg-stone-50">
          <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
            Full Ranking
          </span>
        </div>
        {ranked.map(({ key, score }, i) => (
          <div
            key={key}
            className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-t border-stone-100 hover:bg-stone-50/50 transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <span className="text-stone-400 text-sm font-bold w-6">{i + 1}</span>
              <span className="w-3 h-3 rounded-full" style={{ background: products[key].color }} />
              <span className="text-sm font-medium text-stone-900">{products[key].label}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 sm:w-36 bg-stone-100 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{ width: `${(score / 10) * 100}%`, background: products[key].color }}
                />
              </div>
              <span className="text-sm font-medium text-stone-800 w-12 text-right">
                {score.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 border border-stone-200 rounded-xl p-4 sm:p-5">
        <h4 className="text-sm sm:text-base font-bold text-stone-900 mb-3">
          Score Breakdown - {products[winner.key].label}
        </h4>
        <div className="space-y-2">
          {axes.map(({ key, label }) => {
            const rawScore = products[winner.key].scores[key];
            const weight = weights[key];
            return (
              <div key={key} className="flex items-center justify-between text-sm">
                <span className="text-stone-700 font-medium">{label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-stone-500 text-xs">
                    score {rawScore.toFixed(1)} x {weight}/{totalWeight}
                  </span>
                  <span className="font-bold text-stone-900 w-12 text-right">
                    {((weight / totalWeight) * rawScore).toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
