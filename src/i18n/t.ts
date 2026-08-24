import de from './locales/de'
import en from './locales/en'
import { resolve, type Catalog, type Vars } from './resolve'
import type { Language } from './languages'

export type Namespace = keyof typeof de

type PluralCategory = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other'

type StripPlural<K extends string> = K extends `${infer Base}_${PluralCategory}` ? Base : K

type DottedPaths<T> = T extends string
  ? never
  : {
      [K in keyof T & string]: T[K] extends string ? K : `${K}.${DottedPaths<T[K]>}`
    }[keyof T & string]

export type TranslationKey<N extends Namespace> = StripPlural<DottedPaths<(typeof de)[N]>>

export function getTranslations<N extends Namespace>(language: Language, namespace: N) {
  const scoped = {
    de: de[namespace] as unknown as Catalog,
    en: en[namespace] as unknown as Catalog,
  }

  return (key: TranslationKey<N>, vars?: Vars): string =>
    resolve(scoped, language, key as string, vars)
}
