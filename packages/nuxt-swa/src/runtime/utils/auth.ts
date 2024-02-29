import type { ClientPrincipal } from '../types'

export function parseClientPrincipal(
  header: string | null | undefined
): ClientPrincipal | null {
  if (!header) return null
  try {
    const buffer = Buffer.from(header, 'base64')
    const jsonString = buffer.toString('utf8')
    return JSON.parse(jsonString)
  } catch {
    return null
  }
}
