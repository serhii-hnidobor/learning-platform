import { ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

export type Providers =
  | Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
  | []
  | never[];
