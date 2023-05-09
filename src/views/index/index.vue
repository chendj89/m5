<template>
  <div>
    <uDropdown v-model="options" size="small">
      <n-button type="primary">添加路由</n-button>
    </uDropdown>
  </div>
</template>
<script lang="ts" setup name="Index">
import loadVirtual from "@/virtual";
import uDropdown from "@/unity/uDropdown";

const router = useRouter();
/**
 * 添加动态路由
 */
const addRoute = () => {
  const name = "virtual1";
  if (!router.hasRoute(name)) {
    loadVirtual({ name });
  }
  router.push(name);
};

const options = [
  {
    label: "用户名",
    key: "username",
  },
];
</script>

<style scoped></style>
