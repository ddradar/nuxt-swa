import type { RouteMiddleware } from 'nuxt/app'

type SpecifiedRole = Exclude<UserRole, 'anonymous'>

declare module '#app' {
  interface PageMeta {
    /** List of roles required to view this page */
    allowedRoles?: SpecifiedRole | SpecifiedRole[]
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    /** List of roles required to view this page */
    allowedRoles?: SpecifiedRole | SpecifiedRole[]
  }
}

export default RouteMiddleware