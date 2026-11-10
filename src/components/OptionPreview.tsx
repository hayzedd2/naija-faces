import {
  BACKGROUNDS,
  FABRICS,
  HAIR_COLORS,
  SKINS,
  type CategoryKey,
  type Traits,
} from '../face/config'
import { Face } from '../face/Face'

type Props = {
  category: CategoryKey
  index: number
  traits: Traits
}

const PREVIEW_BG = '#f7f0e5'

const CROPS: Partial<Record<CategoryKey, string>> = {
  face: '116 40 280 380',
  hair: '96 16 320 432',
  headwear: '84 0 344 300',
  brow: '160 172 192 108',
  eye: '162 182 188 102',
  nose: '208 198 96 132',
  mouth: '190 310 132 86',
  beard: '144 188 224 224',
  glasses: '146 184 220 134',
  earrings: '100 176 152 200',
  necklace: '140 340 232 172',
  marks: '154 150 204 230',
  eyeColor: '162 186 188 98',
}

const HIDE: Partial<Record<CategoryKey, Partial<Traits>>> = {
  face: { hair: 8, beard: 0, glasses: 0, earrings: 0, headwear: 0, necklace: 0 },
  hair: { glasses: 0, earrings: 0, headwear: 0, necklace: 0 },
  headwear: { glasses: 0 },
  brow: { glasses: 0 },
  eye: { glasses: 0 },
  nose: { glasses: 0 },
  mouth: { beard: 0, glasses: 0 },
  beard: { glasses: 0 },
  glasses: {},
  earrings: { hair: 1, glasses: 0, headwear: 0, necklace: 0 },
  necklace: { glasses: 0, beard: 0 },
  marks: { beard: 0, glasses: 0 },
  eyeColor: {},
}

export function OptionPreview({ category, index, traits }: Props) {
  if (category === 'skin') {
    return (
      <span
        className="swatch"
        style={{ background: (SKINS[index] ?? SKINS[0]).base }}
        aria-hidden="true"
      />
    )
  }

  if (category === 'hairColor') {
    return (
      <span
        className="swatch"
        style={{ background: (HAIR_COLORS[index] ?? HAIR_COLORS[0]).value }}
        aria-hidden="true"
      />
    )
  }

  if (category === 'fabric') {
    const fabric = FABRICS[index] ?? FABRICS[0]
    const background = fabric.pattern
      ? `repeating-linear-gradient(135deg, ${fabric.value} 0 7px, #e8c46a 7px 9px, ${fabric.value} 9px 16px)`
      : fabric.value
    return <span className="swatch" style={{ background }} aria-hidden="true" />
  }

  if (category === 'bg') {
    return (
      <span
        className="swatch swatch-square"
        style={{ background: (BACKGROUNDS[index] ?? BACKGROUNDS[0]).value }}
        aria-hidden="true"
      />
    )
  }

  const previewTraits: Traits = {
    ...traits,
    ...HIDE[category],
    [category]: index,
  }

  if (category === 'eyeColor') {
    previewTraits.eyeColor = index
    previewTraits.glasses = 0
  }

  return (
    <Face
      traits={previewTraits}
      decorative
      background={PREVIEW_BG}
      viewBox={CROPS[category] ?? '0 0 512 512'}
      className="option-face"
    />
  )
}
