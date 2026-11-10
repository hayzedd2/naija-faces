import { DEFAULT_TRAITS, OPTION_COUNTS, TRAIT_KEYS, type Traits } from './config'

const WEIGHTS: Partial<Record<keyof Traits, number[]>> = {
  hair: [0.17, 0.12, 0.1, 0.1, 0.1, 0.08, 0.08, 0.08, 0.04, 0.13],
  headwear: [0.5, 0.16, 0.12, 0.11, 0.11],
  fabric: [0.18, 0.16, 0.12, 0.12, 0.1, 0.08, 0.08, 0.08, 0.08],
  beard: [0.27, 0.2, 0.11, 0.12, 0.08, 0.12, 0.1],
  glasses: [0.68, 0.14, 0.12, 0.06],
  earrings: [0.5, 0.14, 0.09, 0.08, 0.08, 0.06, 0.05],
  necklace: [0.55, 0.17, 0.12, 0.08, 0.08],
  marks: [0.8, 0.09, 0.06, 0.05],
}

function weightedIndex(count: number, weights?: number[]): number {
  if (!weights || weights.length !== count) {
    return Math.floor(Math.random() * count)
  }
  const total = weights.reduce((sum, weight) => sum + weight, 0)
  let roll = Math.random() * total
  for (let i = 0; i < weights.length; i += 1) {
    roll -= weights[i]
    if (roll <= 0) return i
  }
  return weights.length - 1
}

export function randomTraits(): Traits {
  const next: Traits = { ...DEFAULT_TRAITS }
  for (const key of TRAIT_KEYS) {
    next[key] = weightedIndex(OPTION_COUNTS[key], WEIGHTS[key])
  }
  return next
}

export function randomTraitValue(key: keyof Traits): number {
  return weightedIndex(OPTION_COUNTS[key], WEIGHTS[key])
}
