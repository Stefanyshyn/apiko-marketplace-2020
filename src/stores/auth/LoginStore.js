import { types as t } from 'mobx-state-tree';

export const LoginStore = t.model({
  email: t.optional(t.string, ''),
  password: t.optional(t.string, ''),
  isLoading: false,
  isError: false,
});
