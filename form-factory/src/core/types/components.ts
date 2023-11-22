import { Component } from 'vue';

export type TFormItemComponent = 'input' | 'select' | 'timePicker' | 'timeRangePicker' | 'custom';

export type TCommonField = {
  [key: string]: any;
};

interface IBaseOption<
  T extends TCommonField,
  F extends TCommonField,
  S extends keyof TCommonField = string,
> {
  label: string;
  field: string;
  props?: T;
  value?: T['value'];
  rules?: F['rules'];
  slots?: Partial<Record<S, string>>;
  col?: number;
}

export interface ICustomOption<
  T extends TCommonField,
  F extends TCommonField,
  S extends keyof TCommonField = string,
> extends IBaseOption<T, F, S> {
  type: 'custom';
  component: Component;
}

export interface IOption<
  K extends TFormItemComponent,
  T extends TCommonField,
  F extends TCommonField,
  S extends keyof TCommonField = string,
> extends IBaseOption<T, F, S> {
  type: K;
}

export interface IButton<T> {
  content: string;
  props: T;
}

export namespace FormFactoryProps {
  export type Options<T> = T[];
  export type ModelValue = Object;
  export type Config<T> = T;
}
