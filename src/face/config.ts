export type SkinTone = {
  name: string
  base: string
  shadow: string
  light: string
  lip: string
}

export const SKINS: SkinTone[] = [
  { name: 'Porcelain', base: '#f4cdb9', shadow: '#ddab95', light: '#fbe2d5', lip: '#c47e72' },
  { name: 'Fair', base: '#eebda4', shadow: '#d59f84', light: '#f8d8c5', lip: '#bb7062' },
  { name: 'Light', base: '#e2a886', shadow: '#c78b69', light: '#efc0a1', lip: '#b26a58' },
  { name: 'Warm', base: '#d6986f', shadow: '#b97b53', light: '#e5b18b', lip: '#a55e49' },
  { name: 'Olive', base: '#b58a62', shadow: '#96704a', light: '#caa57d', lip: '#8a533f' },
  { name: 'Tan', base: '#c78f64', shadow: '#a66f48', light: '#dcae85', lip: '#955440' },
  { name: 'Golden', base: '#b97e52', shadow: '#98613a', light: '#d09a6d', lip: '#874934' },
  { name: 'Bronze', base: '#a66a41', shadow: '#84502d', light: '#bf865b', lip: '#773d2b' },
  { name: 'Brown', base: '#8e5736', shadow: '#6d3e24', light: '#a97049', lip: '#663224' },
  { name: 'Mahogany', base: '#8a4a32', shadow: '#693322', light: '#a56448', lip: '#5f2a1f' },
  { name: 'Deep', base: '#74442c', shadow: '#57301d', light: '#8d5b3d', lip: '#52261c' },
  { name: 'Espresso', base: '#5b3221', shadow: '#422115', light: '#75482f', lip: '#3f1c15' },
  { name: 'Cocoa', base: '#47271b', shadow: '#311810', light: '#613a2b', lip: '#301510' },
  { name: 'Ebony', base: '#341c13', shadow: '#22100b', light: '#4d2c21', lip: '#25110d' },
]

export type ColorOption = { name: string; value: string }
export type FabricOption = ColorOption & { pattern?: 'aso-oke' }

export const HAIR_COLORS: ColorOption[] = [
  { name: 'Jet', value: '#191411' },
  { name: 'Soft black', value: '#251b16' },
  { name: 'Espresso', value: '#32231a' },
  { name: 'Dark brown', value: '#3f2a1d' },
  { name: 'Brown', value: '#543723' },
  { name: 'Chestnut', value: '#6b4526' },
  { name: 'Auburn', value: '#7c3f24' },
  { name: 'Copper', value: '#a2552b' },
  { name: 'Honey', value: '#c08c4f' },
  { name: 'Blonde', value: '#d6b075' },
  { name: 'Platinum', value: '#e7d8b8' },
  { name: 'Ash', value: '#9a958f' },
  { name: 'Silver', value: '#c9c7c4' },
  { name: 'Snow', value: '#eeeae4' },
]

export const EYE_COLORS: ColorOption[] = [
  { name: 'Dark brown', value: '#2f1c12' },
  { name: 'Brown', value: '#57351d' },
  { name: 'Amber', value: '#9a6428' },
  { name: 'Hazel', value: '#7c7136' },
  { name: 'Green', value: '#4f6b43' },
  { name: 'Blue', value: '#547c99' },
  { name: 'Gray', value: '#7d8a92' },
  { name: 'Ice', value: '#a8c4cf' },
]

export const BACKGROUNDS: ColorOption[] = [
  { name: 'Sky', value: '#a9c7e8' },
  { name: 'Cream', value: '#f3ecdd' },
  { name: 'Butter', value: '#f0d27a' },
  { name: 'Apricot', value: '#f2b28c' },
  { name: 'Coral', value: '#ec8b74' },
  { name: 'Rose', value: '#e7a3ad' },
  { name: 'Lilac', value: '#c3b2e0' },
  { name: 'Sage', value: '#b8c9a4' },
  { name: 'Mint', value: '#a5d6c3' },
  { name: 'Teal', value: '#78b5b2' },
  { name: 'Slate', value: '#9aa8b6' },
  { name: 'Charcoal', value: '#343a40' },
  { name: 'Clay', value: '#c97b5a' },
  { name: 'Olive', value: '#b0aa6b' },
  { name: 'Powder', value: '#dfe7f0' },
  { name: 'Bubblegum', value: '#f2b8cf' },
]

export const FABRICS: FabricOption[] = [
  { name: 'Indigo', value: '#2f4f7f' },
  { name: 'Magenta', value: '#b8326b' },
  { name: 'Gold', value: '#c99a3f' },
  { name: 'Coral', value: '#d96a4f' },
  { name: 'Emerald', value: '#2f6b4f' },
  { name: 'Burgundy', value: '#7a2e3a' },
  { name: 'Cream', value: '#e9d9b8' },
  { name: 'Teal', value: '#2f7f7a' },
  { name: 'Aso oke', value: '#b8326b', pattern: 'aso-oke' },
]

export type HeadwearOption = { name: string; note: string; recolor?: boolean }

export const HEADWEAR: HeadwearOption[] = [
  { name: 'None', note: 'No headwear' },
  { name: 'Gele', note: 'Yoruba head tie', recolor: true },
  { name: 'Filah', note: 'Hausa/Fulani cap' },
  { name: 'Okpu Agu', note: 'Igbo cap' },
  { name: 'Fula/Kufi', note: 'Hausa/Fulani round cap' },
]

export const FACE_SHAPES = ['Classic', 'Round', 'Square', 'Long', 'Heart'] as const
export const HAIR_STYLES = [
  'Fade',
  'Buzz',
  'Afro',
  'Curls',
  'Waves',
  'Locs',
  'Long',
  'Bob',
  'Bald',
  'Pompadour',
] as const
export const BROWS = ['Serious', 'Straight', 'Arched', 'Soft', 'Bushy', 'Thin'] as const
export const EYES = ['Almond', 'Round', 'Hooded', 'Wide', 'Sleepy', 'Sharp'] as const
export const NOSES = ['Broad', 'Narrow', 'Button', 'Roman', 'Flat'] as const
export const MOUTHS = ['Neutral', 'Smile', 'Smirk', 'Grin', 'Frown', 'Full'] as const
export const BEARDS = [
  'Clean',
  'Stubble',
  'Mustache',
  'Goatee',
  'Chin strap',
  'Full beard',
  'Short beard',
] as const
export const GLASSES = ['None', 'Round', 'Rectangle', 'Sun'] as const
export const EARRINGS = [
  'None',
  'Hoops',
  'Studs',
  'Drops',
  'Coral drops',
  'Gold chandelier',
  'Cowrie',
] as const
export const MARKS = ['None', 'Pele', 'Peue', 'Abaja'] as const
export const MARK_NOTES = [
  'No facial marks',
  'Yoruba cheek marks',
  'Yoruba temple marks',
  'Igbo facial marks',
] as const
export const NECKLACES = ['None', 'Coral beads', 'Gold chain', 'Cowrie', 'Beaded collar'] as const
export const NECKLACE_NOTES = [
  'No necklace',
  'Coral bead strands',
  'Fine gold chain',
  'Cowrie shell string',
  'Beaded collar',
] as const

export type Traits = {
  skin: number
  face: number
  hair: number
  hairColor: number
  headwear: number
  fabric: number
  brow: number
  eye: number
  eyeColor: number
  nose: number
  mouth: number
  beard: number
  glasses: number
  earrings: number
  necklace: number
  marks: number
  bg: number
}

export const DEFAULT_TRAITS: Traits = {
  skin: 8,
  face: 0,
  hair: 0,
  hairColor: 1,
  headwear: 0,
  fabric: 0,
  brow: 0,
  eye: 0,
  eyeColor: 0,
  nose: 0,
  mouth: 0,
  beard: 1,
  glasses: 0,
  earrings: 0,
  necklace: 0,
  marks: 0,
  bg: 0,
}

export const TRAIT_KEYS: (keyof Traits)[] = [
  'skin',
  'face',
  'hair',
  'hairColor',
  'headwear',
  'fabric',
  'brow',
  'eye',
  'eyeColor',
  'nose',
  'mouth',
  'beard',
  'glasses',
  'earrings',
  'necklace',
  'marks',
  'bg',
]

export const OPTION_COUNTS: Record<keyof Traits, number> = {
  skin: SKINS.length,
  face: FACE_SHAPES.length,
  hair: HAIR_STYLES.length,
  hairColor: HAIR_COLORS.length,
  headwear: HEADWEAR.length,
  fabric: FABRICS.length,
  brow: BROWS.length,
  eye: EYES.length,
  eyeColor: EYE_COLORS.length,
  nose: NOSES.length,
  mouth: MOUTHS.length,
  beard: BEARDS.length,
  glasses: GLASSES.length,
  earrings: EARRINGS.length,
  necklace: NECKLACES.length,
  marks: MARKS.length,
  bg: BACKGROUNDS.length,
}

export type CategoryKey = keyof Traits

export type Category = {
  key: CategoryKey
  label: string
  options: { label: string; color?: string; note?: string }[]
}

export const CATEGORIES: Category[] = [
  { key: 'skin', label: 'Skin', options: SKINS.map((s) => ({ label: s.name, color: s.base })) },
  { key: 'face', label: 'Face', options: FACE_SHAPES.map((label) => ({ label })) },
  { key: 'hair', label: 'Hair', options: HAIR_STYLES.map((label) => ({ label })) },
  {
    key: 'hairColor',
    label: 'Hair color',
    options: HAIR_COLORS.map((c) => ({ label: c.name, color: c.value })),
  },
  {
    key: 'headwear',
    label: 'Headwear',
    options: HEADWEAR.map((h) => ({ label: h.name, note: h.note })),
  },
  {
    key: 'fabric',
    label: 'Fabric',
    options: FABRICS.map((f) => ({ label: f.name, color: f.value })),
  },
  { key: 'brow', label: 'Brows', options: BROWS.map((label) => ({ label })) },
  { key: 'eye', label: 'Eyes', options: EYES.map((label) => ({ label })) },
  {
    key: 'eyeColor',
    label: 'Eye color',
    options: EYE_COLORS.map((c) => ({ label: c.name, color: c.value })),
  },
  { key: 'nose', label: 'Nose', options: NOSES.map((label) => ({ label })) },
  { key: 'mouth', label: 'Mouth', options: MOUTHS.map((label) => ({ label })) },
  { key: 'beard', label: 'Beard', options: BEARDS.map((label) => ({ label })) },
  { key: 'glasses', label: 'Glasses', options: GLASSES.map((label) => ({ label })) },
  { key: 'earrings', label: 'Earrings', options: EARRINGS.map((label) => ({ label })) },
  {
    key: 'necklace',
    label: 'Necklace',
    options: NECKLACES.map((label, i) => ({ label, note: NECKLACE_NOTES[i] })),
  },
  {
    key: 'marks',
    label: 'Facial marks',
    options: MARKS.map((label, i) => ({ label, note: MARK_NOTES[i] })),
  },
  {
    key: 'bg',
    label: 'Background',
    options: BACKGROUNDS.map((c) => ({ label: c.name, color: c.value })),
  },
]

export type PickerKey = CategoryKey | 'jewelry'

export const PICKER_TABS: { key: PickerKey; label: string }[] = [
  { key: 'skin', label: 'Skin' },
  { key: 'face', label: 'Face' },
  { key: 'hair', label: 'Hair' },
  { key: 'hairColor', label: 'Hair color' },
  { key: 'headwear', label: 'Headwear' },
  { key: 'brow', label: 'Brows' },
  { key: 'eye', label: 'Eyes' },
  { key: 'eyeColor', label: 'Eye color' },
  { key: 'nose', label: 'Nose' },
  { key: 'mouth', label: 'Mouth' },
  { key: 'beard', label: 'Beard' },
  { key: 'glasses', label: 'Glasses' },
  { key: 'jewelry', label: 'Jewelry' },
  { key: 'marks', label: 'Marks' },
  { key: 'bg', label: 'Background' },
]

export function headwearIsRecolorable(value: number): boolean {
  return HEADWEAR[value]?.recolor === true
}

export const COMBINATION_COUNT = TRAIT_KEYS.reduce(
  (total, key) => total * OPTION_COUNTS[key],
  1,
)
