import type { TFormItemComponent } from '../../../core/types';

const GET_CHANGE_VALUE_MAP: Record<TFormItemComponent, (e: any) => any> = {
  input: e => e.target.value,
  select: e => e,
  custom: e => e,
};

export const getValue = (type: TFormItemComponent, ...args: any[]) => {
  // @ts-ignore
  return GET_CHANGE_VALUE_MAP[type]?.(...args);
};
