<template>
  <n-button type="primary" @click="addRoute">添加路由</n-button>
</template>
<script lang="ts" setup name="Index">
import loadVirtual from "@/virtual";

const router = useRouter();
const addRoute = () => {
  const routerName = "Virtual1";
  if (!router.hasRoute(routerName)) {
    loadVirtual({ routerName });
  }
  router.push(routerName);
};
</script>

<style scoped></style>
