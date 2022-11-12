import { ActionConfig, LovelaceCard, LovelaceCardConfig, LovelaceCardEditor } from 'custom-card-helpers';
import { HassEntity, HassEntityAttributeBase } from 'home-assistant-js-websocket';

declare global {
  interface HTMLElementTagNameMap {
    'boilerplate-card-editor': LovelaceCardEditor;
    'hui-error-card': LovelaceCard;
  }
}

// TODO Add your configuration elements here for type-checking
export interface BoilerplateCardConfig extends LovelaceCardConfig {
  type: string;
  name?: string;
  show_warning?: boolean;
  show_error?: boolean;
  test_gui?: boolean;
  entity?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  toggleTrigger?: string
}

export interface HoneywellConfig extends HassEntityAttributeBase {
  friendly_name : string
  hvac_action : string
  hvac_modes : string[] //'off', 'heat', 'cool', 'heat_cool'
  max_temp : number
  min_temp : number
  preset_mode : string
  preset_modes : string[]
  supported_features : number
  target_temp_high : null | number
  target_temp_low : null | number
  current_temperature?: number
  temperature?: number
  fan_modes?: string[]
  fan_mode?: string
  fan?: string
  aux_heat?: string
  humidity?: number
  current_humidity?: number
  min_humidity?: number
  max_humidity?: number
}

export type HoneywellProps = HoneywellConfig & { [key: string]: any; }

export interface HoneywellEntity extends HassEntity {
  attributes: HoneywellProps
  context: {
    id: string,
    parent_id: null | string,
    user_id: null | string
  }
  entity_id: string
  last_changed: string
  last_updated: string
  state: string
}

export interface HADialog extends Element {
  show: () => void
  close: () => void
}
export interface IControlProps {
  temperature: number | null | undefined
  hvac_mode_text: string
  hvacMode: HvacModes
  textColor: string
  handleClick: (options: ITempClickOptions) => () => void
  target: string

}
export type HvacModes = 'off' | 'heat' | 'cool' | 'heat_cool'
export interface ITempClickOptions {
  hvacMode: HvacModes
  temperature: number | null | undefined
  target: string
}

export interface ITargetTempsState {
  targetTempLow: number | null
  targetTempHigh: number | null
  tempsChanged: boolean
}

export interface buildInputProps {
  min_humidity: number,
  max_humidity: number,
  humidity: number
}