import React from 'react'
import AppContext from '@src/appContext'
import Select, { Option } from './base/Select'
import { stylePresetLabels, StylePreset } from '@types'

const StylePresets: React.FC = () => {
  const { stylePreset, setStylePreset } = React.useContext(AppContext)
  return (
    <div>
      <Select
        placeholder="Select a style preset"
        defaultValue={stylePreset
          ? [
              {
                label: stylePresetLabels[stylePreset],
                value: stylePreset,
              },
            ]
          : undefined}
        options={Object.entries(stylePresetLabels).map(([value, label]) => ({
          value,
          label,
        }))}
        onChange={((selected:any) => {
          setStylePreset(selected.value as StylePreset)
        })}
      />
    </div>
  )
}

export default StylePresets
