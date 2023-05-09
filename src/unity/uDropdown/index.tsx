import {
  defineComponent,
  h,
  ref,
  type Ref,
  Fragment,
  watch,
  nextTick,
} from "vue";
import { NDropdown } from "naive-ui";

export default defineComponent({
  name: "UDropDown",
  extends: NDropdown,
  props: {
    modelValue: {
      type: Array,
      require: true,
    },
  },
  setup(props, { emit }) {
    const x: Ref<number> = ref(0);
    const y: Ref<number> = ref(0);
    const show: Ref<boolean> = ref(false);
    const options: any = ref(props.modelValue);
    const select = (key: string | number) => {
      console.log(key);
      show.value = false;
    };
    const outside = () => {
      show.value = false;
    };
    const contextMenu = (e: MouseEvent) => {
      console.log("0000");
      e.preventDefault();
      show.value = false;
      nextTick().then(() => {
        show.value = true;
        x.value = e.clientX;
        y.value = e.clientY;
      });
    };
    const updateOptions = (newOptions: any) =>
      emit("update:modelValue", newOptions);
    watch(() => props.modelValue, updateOptions);
    return {
      x,
      y,
      show,
      options,
      select,
      outside,
      contextMenu,
    };
  },
  render() {
    return h(Fragment, null, [
      h(
        "div",
        {
          onContextmenu: this.contextMenu,
          style: "display: inline-block;",
        },
        this.$slots.default?.()
      ),
      h(NDropdown, {
        ...this.$props,
        trigger: "manual",
        x: this.x,
        y: this.y,
        show: this.show,
        options: this.options,
        onClickoutside: this.outside,
        onSelect: this.select,
      }),
    ]);
  },
});
