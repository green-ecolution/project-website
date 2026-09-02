export type LogoVariantId = 'logoColor' | 'logoWhite' | 'iconColor' | 'iconWhite'

export interface PressDownload {
  format: 'svg' | 'png'
  label: string
  path: string
}

export interface LogoVariant {
  id: LogoVariantId
  file: string
  // White artwork needs a dark plate to be visible in the preview.
  onDark: boolean
  downloads: PressDownload[]
}

export const PNG_WIDTHS = [1024, 2048] as const

const LOGO_DIR = 'press/logos'

function logoVariant(id: LogoVariantId, file: string, onDark: boolean): LogoVariant {
  return {
    id,
    file,
    onDark,
    downloads: [
      { format: 'svg', label: 'SVG', path: `${LOGO_DIR}/${file}.svg` },
      ...PNG_WIDTHS.map((width) => ({
        format: 'png' as const,
        label: `PNG ${width} px`,
        path: `${LOGO_DIR}/${file}-${width}.png`,
      })),
    ],
  }
}

export const LOGO_VARIANTS: LogoVariant[] = [
  logoVariant('logoColor', 'green-ecolution-logo-color', false),
  logoVariant('logoWhite', 'green-ecolution-logo-white', true),
  logoVariant('iconColor', 'green-ecolution-icon-color', false),
  logoVariant('iconWhite', 'green-ecolution-icon-white', true),
]

export const LOGO_ZIP_PATH = `${LOGO_DIR}/green-ecolution-logos.zip`

export const PITCH_DECK_PATH = 'press/pitch-deck/green-ecolution-pitch-deck.pdf'

export function pressAssetUrl(baseUrl: string, path: string): string {
  return `${baseUrl.replace(/\/+$/, '')}/${path}`
}
