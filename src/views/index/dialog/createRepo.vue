<template>
  <div>
    <DataForm
      ref="dataFormRef"
      :formConfig="formConfig"
      :options="options"
    ></DataForm>
    <teleport to="#footer">
      <n-button type="primary" size="small" @click="success">保存</n-button>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { FormProps } from "naive-ui";
import { renderInput } from "@/hooks/form";
import { ref } from "vue";
import { DataFormType, FormItem } from '@/types/components'
const props = defineProps(["onSuccess", "onCancel", "onClose", "Params"]);

const createOptions = (row?: any) => {
  return [
    {
      label: "仓库名",
      key: "repo",
      required: true,
      value: ref(null),
      render: (formItem) =>
        renderInput(formItem.value, {
          placeholder: "请输入仓库名",
          clearable: true,
        }),
      validator: (formItem, message) => {
        if (!formItem.value.value) {
          message.error("请输入仓库名");
          return false;
        }
        return true;
      },
    },
  ] as FormItem[];
};
const formConfig: FormProps = {
  labelWidth: 60,
  size: "medium",
  labelAlign: "right",
};
const options = createOptions();
let dataFormRef = ref<DataFormType | null>(null);
const success = () => {
  if (dataFormRef.value.validator()) {
    let params = dataFormRef.value?.generatorParams();
    console.log(params);
  }
};
</script>

<style scoped></style>
