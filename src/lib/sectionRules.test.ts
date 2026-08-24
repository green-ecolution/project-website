import { describe, expect, it } from 'vitest'
import { getSectionRule, headingFromId } from './sectionRules'

describe('headingFromId', () => {
  it('macht aus Bindestrichen wieder Leerzeichen', () => {
    expect(headingFromId('was-ist-green-ecolution')).toBe('was ist green ecolution')
  })

  it('lässt eine einteilige ID unverändert', () => {
    expect(headingFromId('highlights')).toBe('highlights')
  })
})

describe('getSectionRule', () => {
  it('erkennt Highlights', () => {
    expect(getSectionRule('Highlights').id).toBe('highlights')
  })

  it('erkennt Fehlerbehebungen über den Wortanfang', () => {
    expect(getSectionRule('Fehlerbehebungen').id).toBe('fixes')
  })

  it('erkennt einen englischen Abschnitt genauso', () => {
    expect(getSectionRule('Bug fixes').id).toBe('fixes')
  })

  it('gibt einer Einschränkung den gedeckten Farbton', () => {
    const rule = getSectionRule('Bekannte Einschränkungen')
    expect(rule.id).toBe('limitations')
    expect(rule.tone).toBe('muted')
  })

  it('nimmt die erste passende Regel, nicht die breiteste', () => {
    expect(getSectionRule('Neue Funktionen').id).toBe('features')
    expect(getSectionRule('Wichtige Hinweise zu neuen Funktionen').id).toBe('important')
  })

  it('fällt auf general zurück, wenn kein Stichwort passt', () => {
    expect(getSectionRule('Sonstiges').id).toBe('general')
  })

  it('arbeitet auch auf einer normalisierten Heading-ID', () => {
    expect(getSectionRule(headingFromId('was-ist-green-ecolution')).id).toBe('about')
  })
})
