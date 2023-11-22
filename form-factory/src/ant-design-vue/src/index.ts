import createFormFactory from '../../core/src';
import type { IAntdvFormConfig, TAntdvFormOptions } from '../types';
import AntdvFormFactoryComponent from './components';

export const createAntdFormFactory = () => {
  return createFormFactory<TAntdvFormOptions, IAntdvFormConfig>(AntdvFormFactoryComponent);
};

const FormFactory = createAntdFormFactory();

export default FormFactory;

export * from '../types';
