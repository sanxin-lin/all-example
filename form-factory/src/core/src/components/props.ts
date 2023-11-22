import { FormFactoryProps } from '../../types';

export const buildProps = <O, C>() => ({
  options: {
    type: Array as PropType<FormFactoryProps.Options<O>>,
    default: () => [],
  },
  modelValue: {
    type: Object as PropType<FormFactoryProps.ModelValue>,
    default: () => ({}),
  },
  config: {
    type: Object as PropType<FormFactoryProps.Config<C>>,
    default: () => ({}),
  },
});
