import type { ReactNode } from 'react'
import { StringsContext } from './useT'

interface TranslationProviderProps {
  strings: Record<string, string>
  children: ReactNode
}

export function TranslationProvider({ strings, children }: TranslationProviderProps) {
  return <StringsContext value={strings}>{children}</StringsContext>
}
