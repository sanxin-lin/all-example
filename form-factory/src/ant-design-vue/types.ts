import { Component } from 'vue';

import type { ICustomOption, IOption } from '../core/types';
import type { FormInstance, FormItemProps } from 'ant-design-vue';
import type {
  ButtonProps,
  InputProps,
  SelectProps,
  TimePickerProps,
  TimeRangePickerProps,
} from 'ant-design-vue';

type TExtends<T> = T & { component?: Component };
type TInputSlotKey = 'addonAfter' | 'addonBefore' | 'prefix' | 'suffix';
type TSelectSlotKey =
  | 'clearIcon'
  | 'dropdownRender'
  | 'maxTagPlaceholder'
  | 'menuItemSelectedIcon'
  | 'notFoundContent'
  | 'option'
  | 'placeholder'
  | 'removeIcon'
  | 'suffixIcon'
  | 'tagRender';
export type TAntdvFormOption =
  | IOption<'input', InputProps, FormItemProps, TInputSlotKey>
  | IOption<'select', SelectProps, FormItemProps, TSelectSlotKey>
  | IOption<'timePicker', TimePickerProps, FormItemProps>
  | IOption<'timeRangePicker', TimeRangePickerProps, FormItemProps>
  | ICustomOption<object, FormItemProps>;
export type TAntdvFormOptions = TAntdvFormOption[] | TAntdvFormOption;
export type TAntdvFormOptionExtend = TExtends<TAntdvFormOption>;
export type TAntdvFormOptionExtends = TAntdvFormOptionExtend[];
export type TAntdvFormButtonType = 'submit' | 'reset';
export interface IAntdvFormButton {
  type?: TAntdvFormButtonType;
  content?: string;
  props?: ButtonProps;
}
export interface IAntdvFormConfig {
  buttons?: IAntdvFormButton[];
  onSubmit?: (res: boolean) => void;
  onReset?: () => void;
  onValuesChange?: (key: string, value: any, values: any) => void;
}
export type AntdvFormInstance = FormInstance;
// const options: TAntdvFormOptionWithComp[] = [
//   {
//     type: 'input',
//     props: {
//       value: '1',
//       placeholder: '请输入',
//     },
//     label: '输入框',
//     field: 'input',
//   },
//   {
//     type: 'select',
//     props: {
//       value: '1',
//       placeholder: '请输入',
//       mode: 'multiple',
//       allowClear: true,
//     },
//     label: '选择框',
//     field: 'select',
//   },
// ];
// console.log(options)
