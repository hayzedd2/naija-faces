import {
  CATEGORIES,
  HEADWEAR,
  PICKER_TABS,
  headwearIsRecolorable,
  type Category,
  type CategoryKey,
  type PickerKey,
  type Traits,
} from '../face/config'
import { CheckIcon, SparkleIcon } from './icons'
import { OptionPreview } from './OptionPreview'

type Props = {
  traits: Traits
  active: PickerKey
  onActiveChange: (key: PickerKey) => void
  onSelect: (key: CategoryKey, index: number) => void
  onRandomizeCategory: (key: PickerKey) => void
}

function OptionGrid({
  category,
  traits,
  onSelect,
}: {
  category: Category
  traits: Traits
  onSelect: Props['onSelect']
}) {
  return (
    <div className="options-grid" role="group" aria-label={`${category.label} options`}>
      {category.options.map((option, index) => {
        const selected = traits[category.key] === index
        return (
          <button
            key={option.label}
            type="button"
            className={`option-tile${selected ? ' is-selected' : ''}`}
            onClick={() => onSelect(category.key, index)}
            aria-pressed={selected}
          >
            <span className="option-art">
              <OptionPreview category={category.key} index={index} traits={traits} />
            </span>
            <span className="option-name">{option.label}</span>
            {selected && (
              <span className="option-check" aria-hidden="true">
                <CheckIcon />
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export function TraitPicker({
  traits,
  active,
  onActiveChange,
  onSelect,
  onRandomizeCategory,
}: Props) {
  const tab = PICKER_TABS.find((item) => item.key === active) ?? PICKER_TABS[0]
  const category = CATEGORIES.find((item) => item.key === active)
  const isJewelry = active === 'jewelry'
  const isHeadwear = active === 'headwear'
  const headwear = HEADWEAR[traits.headwear] ?? HEADWEAR[0]
  const fabricCategory = CATEGORIES.find((item) => item.key === 'fabric')
  const necklaceCategory = CATEGORIES.find((item) => item.key === 'necklace')
  const earringsCategory = CATEGORIES.find((item) => item.key === 'earrings')
  const selectedNote =
    category && traits[category.key] > 0
      ? category.options[traits[category.key]]?.note
      : undefined
  const count = isJewelry
    ? (necklaceCategory?.options.length ?? 0) + (earringsCategory?.options.length ?? 0)
    : (category?.options.length ?? 0)

  return (
    <div className="picker">
      <div className="tabs" role="tablist" aria-label="Face features">
        {PICKER_TABS.map((item) => (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={item.key === active}
            className={`tab${item.key === active ? ' is-active' : ''}`}
            onClick={() => onActiveChange(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="options-head">
        <div>
          <h2 className="options-title">{isJewelry ? 'Jewelry' : category?.label ?? tab.label}</h2>
          <p>
            {count} {count === 1 ? 'option' : 'options'}
          </p>
        </div>
        <button
          type="button"
          className="mini-random"
          onClick={() => onRandomizeCategory(active)}
        >
          <SparkleIcon size={14} />
          Surprise me
        </button>
      </div>

      {selectedNote && !isJewelry && <p className="picker-note">{selectedNote}</p>}

      {isJewelry ? (
        <>
          {necklaceCategory && (
            <>
              <div className="options-subhead">
                <h3>Necklace</h3>
                <p>{necklaceCategory.options.length} options</p>
              </div>
              <OptionGrid category={necklaceCategory} traits={traits} onSelect={onSelect} />
            </>
          )}
          {earringsCategory && (
            <>
              <div className="options-subhead">
                <h3>Earrings</h3>
                <p>{earringsCategory.options.length} options</p>
              </div>
              <OptionGrid category={earringsCategory} traits={traits} onSelect={onSelect} />
            </>
          )}
        </>
      ) : category ? (
        <>
          <OptionGrid category={category} traits={traits} onSelect={onSelect} />
          {isHeadwear && fabricCategory && headwearIsRecolorable(traits.headwear) && (
            <div className="fabric-block">
              <div className="options-subhead">
                <h3>Fabric</h3>
                <p>Colour for the gele</p>
              </div>
              <OptionGrid category={fabricCategory} traits={traits} onSelect={onSelect} />
            </div>
          )}
          {isHeadwear && !headwearIsRecolorable(traits.headwear) && headwear.note !== 'No headwear' && (
            <p className="picker-footnote">This piece keeps its traditional pattern.</p>
          )}
          {isHeadwear && traits.headwear !== 0 && (
            <p className="picker-footnote">
              Hair is tucked away under the headwear. Your chosen style comes back when you remove
              it.
            </p>
          )}
        </>
      ) : null}
    </div>
  )
}
