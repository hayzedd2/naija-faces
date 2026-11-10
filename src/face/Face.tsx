import { useId } from 'react'
import {
  BACKGROUNDS,
  BEARDS,
  EYE_COLORS,
  EYES,
  FABRICS,
  HAIR_COLORS,
  HAIR_STYLES,
  HEADWEAR,
  MARKS,
  NECKLACES,
  SKINS,
  type Traits,
} from './config'
import { Brows } from './features/Brows'
import { BeardBase, Mustache, beardHasMustache } from './features/Beard'
import { Earrings } from './features/Earrings'
import { Eyes } from './features/Eyes'
import { Glasses } from './features/Glasses'
import { HairBack, HairFront } from './features/Hair'
import { Head } from './features/Head'
import { HeadwearFront } from './features/Headwear'
import { Marks } from './features/Marks'
import { Mouth } from './features/Mouth'
import { Necklace } from './features/Necklace'
import { Nose } from './features/Nose'

type Props = {
  traits: Traits
  className?: string
  decorative?: boolean
  svgId?: string
  background?: string
  viewBox?: string
}

export function faceDescription(traits: Traits): string {
  const skin = SKINS[traits.skin] ?? SKINS[0]
  const hair = HAIR_STYLES[traits.hair] ?? HAIR_STYLES[0]
  const eye = EYES[traits.eye] ?? EYES[0]
  const beard = BEARDS[traits.beard] ?? BEARDS[0]
  const headwear = HEADWEAR[traits.headwear] ?? HEADWEAR[0]
  const marks = MARKS[traits.marks] ?? MARKS[0]
  const necklace = NECKLACES[traits.necklace] ?? NECKLACES[0]
  const beardText = traits.beard === 0 ? 'no beard' : `a ${beard.toLowerCase()}`
  const headwearText = traits.headwear === 0 ? '' : `, ${headwear.name.toLowerCase()} headwear`
  const marksText = traits.marks === 0 ? '' : `, ${marks.toLowerCase()} facial marks`
  const necklaceText = traits.necklace === 0 ? '' : `, ${necklace.toLowerCase()}`
  return `Illustrated portrait with ${skin.name.toLowerCase()} skin, ${hair.toLowerCase()} hair${headwearText}${marksText}${necklaceText}, ${eye.toLowerCase()} eyes, and ${beardText}.`
}

export function Face({ traits, className, decorative = false, svgId, background, viewBox }: Props) {
  const reactId = useId()
  const id = (svgId ?? reactId).replace(/[^a-zA-Z0-9_-]/g, '')
  const skin = SKINS[traits.skin] ?? SKINS[0]
  const hairColor = (HAIR_COLORS[traits.hairColor] ?? HAIR_COLORS[0]).value
  const eyeColor = (EYE_COLORS[traits.eyeColor] ?? EYE_COLORS[0]).value
  const fabric = FABRICS[traits.fabric] ?? FABRICS[0]
  const bg = (BACKGROUNDS[traits.bg] ?? BACKGROUNDS[0]).value
  // Headwear hides the hairline; the chosen style returns when the headwear is removed.
  const hair = traits.headwear !== 0 ? 8 : traits.hair

  return (
    <svg
      id={svgId}
      viewBox={viewBox ?? '0 0 512 512'}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : faceDescription(traits)}
    >
      <defs>
        <radialGradient id={`bg-${id}`} cx=".5" cy=".42" r=".78">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".1" />
          <stop offset="1" stopColor="#000000" stopOpacity=".06" />
        </radialGradient>
      </defs>
      <rect width="512" height="512" fill={background ?? bg} />
      <rect width="512" height="512" fill={`url(#bg-${id})`} opacity={background ? 0 : 1} />

      <HairBack value={hair} color={hairColor} skin={skin} id={id} />
      <Head shape={traits.face} skin={skin} id={id} />
      <Necklace value={traits.necklace} />
      <HairFront value={hair} color={hairColor} skin={skin} id={id} />
      <Earrings value={traits.earrings} />
      <HeadwearFront value={traits.headwear} fabric={fabric} id={id} />

      <Brows value={traits.brow} hairColor={hairColor} />
      <Eyes value={traits.eye} color={eyeColor} skin={skin} id={id} />
      <Nose value={traits.nose} skin={skin} id={id} />
      <Marks value={traits.marks} skin={skin} />
      <BeardBase
        value={traits.beard}
        color={hairColor}
        skin={skin}
        shape={traits.face}
        id={id}
      />
      <Mouth value={traits.mouth} skin={skin} id={id} />
      {beardHasMustache(traits.beard) && (
        <Mustache color={hairColor} full={traits.beard !== 1} />
      )}
      <Glasses value={traits.glasses} />
    </svg>
  )
}
