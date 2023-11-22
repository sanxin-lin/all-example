// <!-- <template>
//   <Form :model="formState" ref="formRef">
//     <FormItem
//       v-for="(option, index) in options"
//       :label="option.label"
//       :name="option.field"
//       :key="index"
//       :rules="option.rules"
//     >
//       <component
//         :is="option.component"
//         v-bind="option.props"
//         v-model:value="formState[option.field]"
//       >
//         <template v-for="(slotContent, name) in option.slots" v-slot:[name]>
//           {{ slotContent }}
//         </template>
//       </component>
//     </FormItem>
//     <FormItem>
//       <Button @click="submit">提交</Button>
//       <Button @click="reset">重置</Button>
//     </FormItem>
//   </Form>
// </template> -->

// <script lang="ts">
import { computed, defineComponent, h, isRef, onMounted, ref, unref } from 'vue';
import { Button, Col, Form, FormInstance, FormItem, Row } from 'ant-design-vue';

import { getValue } from '../utils/on-change';

import { buildProps } from '../../../core/src/components/props';
import type { IContext } from '../../../core/types';
import { CONTEXT_KEY } from '../../../shared/config';
import { useContext } from '../../../shared/hooks';
import type {
  IAntdvFormConfig,
  TAntdvFormOption,
  TAntdvFormOptionExtend,
  TAntdvFormOptionExtends,
  TAntdvFormOptions,
} from '../../types';
import { componentMap } from './map';
import { isArray } from 'lodash';
import { cloneDeep } from 'lodash';

export default defineComponent({
  props: buildProps<TAntdvFormOptions, IAntdvFormConfig>(),
  setup(props) {
    const context = useContext<IContext<TAntdvFormOptions, IAntdvFormConfig>>(CONTEXT_KEY);
    const parentOptions = computed(() => cloneDeep(props.options));
    const parentConfig = computed(() => cloneDeep(props.config));
    const buttons = computed(() => {
      const currentButtons = parentConfig.value.buttons;
      if (!currentButtons || !currentButtons.length) return;
      currentButtons.forEach(button => {
        if (button.type === 'submit' && !button.props?.onClick) {
          button.props = {
            ...(button.props ?? {}),
            onClick: submit,
          };
        }
        if (button.type === 'reset' && !button.props?.onClick) {
          button.props = {
            ...(button.props ?? {}),
            onClick: reset,
          };
        }
      });
      return currentButtons;
    });
    const parentSlots = computed(() => cloneDeep(context.slots));
    const parentEmit = computed(() => context.emit);
    const formRef = ref<FormInstance | null>(null);
    onMounted(() => {
      context.setRef(formRef.value);
    });
    const formState = computed({
      get() {
        return props.modelValue;
      },
      set(v) {
        if (isRef(props.modelValue)) {
          parentEmit.value('update:modelValue', v);
        } else {
          Object.assign(props.modelValue, v);
        }
      },
    });
    const buildOption = (option: TAntdvFormOption): TAntdvFormOptionExtend | undefined => {
      if (option.type !== 'custom') {
        const { type, slots = {} } = option;
        const target = componentMap[type];
        if (target) {
          const optionSlots = Object.keys(slots).reduce(
            (slotArr, key) => {
              const currentKey = key as keyof typeof slots;
              const v = slots[currentKey];
              const slotFn = parentSlots.value[v as string];
              if (slotFn) {
                slotArr[currentKey] = slotFn;
              }
              return slotArr;
            },
            {} as Record<string, any>,
          );
          return {
            ...option,
            component: target.component,
            slots: optionSlots,
          };
        }
      } else {
        return option;
      }
    };
    const buildOptions = (
      options: TAntdvFormOption | TAntdvFormOption[],
    ): TAntdvFormOptionExtends => {
      if (isArray(options)) {
        return options
          .map(option => buildOption(option))
          .filter(Boolean) as TAntdvFormOptionExtends;
      }
      return [buildOption(options)].filter(Boolean) as TAntdvFormOptionExtends;
    };
    const options = computed(() => {
      return parentOptions.value.reduce((pre, option) => {
        const o = buildOptions(option as any);
        pre.push(o);
        return pre;
      }, [] as TAntdvFormOptionExtends[]);
    });
    const formValidator = () => {
      return formRef.value
        ?.validate()
        .then(() => true)
        .catch(() => false);
    };
    const submit = () => {
      formValidator()?.then(res => {
        parentConfig.value.onSubmit?.(res);
      });
    };
    const reset = () => {
      formRef.value?.resetFields();
      parentConfig.value.onReset?.();
    };

    const renderFormItem = (option: TAntdvFormOptionExtend) => {
      const { type, label, field, rules, component, props, slots } = option;
      const currentField = field as keyof typeof formState.value;
      return h(
        FormItem,
        {
          label,
          name: field,
          key: field,
          rules,
        },
        {
          default: () => [
            h(
              component!,
              {
                ...(props ?? {}),
                value: formState.value[currentField],
                onChange: (...args: any[]) => {
                  // @ts-ignore
                  const v = getValue(type, ...args);
                  formState.value = {
                    ...formState.value,
                    // @ts-ignore
                    [currentField]: v,
                  };
                  parentConfig.value.onValuesChange?.(currentField, v, unref(formState.value));
                  // @ts-ignore
                  props?.onChange?.(...args);
                },
              },
              slots,
            ),
          ],
        },
      );
    };

    const renderButtons = () => {
      const currentButtons = buttons.value;
      if (!currentButtons) return null;
      return h(FormItem, null, {
        default: () =>
          currentButtons.map(({ props = {}, content = null }) =>
            h(Button, { ...props }, { default: () => content }),
          ),
      });
    };

    const renderRow = (options: TAntdvFormOptionExtends) => {
      return h(Row, null, {
        default: () => options.map(option => renderCol(option)),
      });
    };

    const renderCol = (option: TAntdvFormOptionExtend) => {
      const { col = 24 } = option;
      return h(
        Col,
        {
          span: col,
        },
        { default: () => renderFormItem(option) },
      );
    };

    return () => {
      return h(
        Form,
        {
          model: formState.value,
          ref: formRef,
        },
        {
          default: () => [...options.value.map(renderRow), renderButtons()],
        },
      );
    };
  },
});
// </script>
