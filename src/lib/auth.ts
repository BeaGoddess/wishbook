import { createServerFn } from '@tanstack/react-start'
import { createClient } from '#/lib/supabase/server'

export const getUser = createServerFn({ method: 'GET' }).handler(async () => {
  const { data } = await createClient().auth.getClaims()
  const claims = data?.claims
  return claims ? { id: claims.sub, email: claims.email } : null
})
