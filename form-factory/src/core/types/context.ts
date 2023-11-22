import { FormFactoryProps } from './components';

export interface IContext<O, C> {
  props: {
    options: FormFactoryProps.Options<O>;
    modelValue: FormFactoryProps.ModelValue;
    config: FormFactoryProps.Config<C>;
  };
  slots: Record<string, any>;
  emit: (event: string, ...args: any[]) => void;
  setRef: (v: any) => void;
}
