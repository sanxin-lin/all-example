import { Component } from 'vue';

import createFormFactoryComponent from './components/FormFactory';

const createFormFactory = <O, C>(component: Component) => {
  return createFormFactoryComponent<O, C>(component);
};

export default createFormFactory;
