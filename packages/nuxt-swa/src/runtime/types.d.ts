interface Claim {
  typ: string
  val: string
}
/**
 * User-identifiable information to your app.
 * @see https://learn.microsoft.com/azure/static-web-apps/user-information?tabs=javascript#client-principal-data
 */
export interface ClientPrincipal {
  /** The name of the identity provider. */
  identityProvider: IdentityProvider
  /**
   * An Azure Static Web Apps-specific unique identifier for the user.
   * - The value is unique on a per-app basis. For instance, the same user returns a different `userId` value on a different Static Web Apps resource.
   * - The value persists for the lifetime of a user. If you delete and add the same user back to the app, a new `userId` is generated.
   */
  userId: string
  /**
   * Username or email address of the user.
   * Some providers return the user's email address, while others send the user handle.
   */
  userDetails: string
  /** An array of the user's assigned roles. */
  userRoles: UserRole[]
  /**
   * An array of claims returned by your custom authentication provider.
   * Only accessible in the direct-access endpoint (/.auth/me).
   */
  claims?: Claim[]
}
