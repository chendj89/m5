<template>
  <n-button type="primary" @click="addRoute">添加路由</n-button>
</template>
<script lang="ts" setup name="Index">
import loadVirtual from "@/virtual";

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
</script>

<style scoped></style>
