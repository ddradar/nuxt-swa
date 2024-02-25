import { vi } from 'vitest'

vi.stubGlobal('$fetch', { ...vi.fn(), create: vi.fn() })
