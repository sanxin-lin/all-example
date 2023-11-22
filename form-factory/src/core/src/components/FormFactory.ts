import { Component, defineComponent, h } from 'vue';

import { createContext } from '../../../shared/hooks/useContext';

import { CONTEXT_KEY, FORM_FACTORY_NAME } from '../../../shared/config';
import type { IContext } from '../../types';
import { buildProps } from './props';

export const createFormFactoryComponent = <O, C>(component: Component) => {
  return defineComponent({
    name: FORM_FACTORY_NAME,
    props: buildProps<O, C>(),
    setup(props, { slots, emit, expose }) {
      const formRef: any = {};
      createContext<IContext<O, C>>(CONTEXT_KEY, {
        props,
        slots,
        emit,
        setRef: (v: any) => {
          // 设置表单实例
          Object.assign(formRef, v);
        },
      });
      expose(formRef);
      return () =>
        component
          ? h(component, {
              ...props,
            })
          : null;
    },
  });
};

export default createFormFactoryComponent;
