<template>
  <div style="width: 440px">
    <n-tree
      block-line
      :data="tree"
      :default-expanded-keys="defaultExpandedKeys"
      :node-props="nodeProps"
      :render-suffix="renderPrefix"
    >
    </n-tree>
    <n-dropdown
      trigger="manual"
      placement="bottom-start"
      :show="showDropdown"
      :options="(options as any)"
      :x="x"
      :y="y"
      @select="handleSelect"
      @clickoutside="handleClickoutside"
    />
  </div>
</template>

<script setup lang="ts" name="Repo">
import useDialog2 from "@/plugins/useDialog2";
import repoTemp from "./dialog/createRepo.vue";
import {
  useMessage,
  type DropdownOption,
  type TreeOption,
  NImage,
} from "naive-ui";
import { randomString } from "@/utils";
import request from "@/utils/fetch";
const dialog2 = useDialog2();
const createRepo = () => {
  dialog2(repoTemp, {
    title: "新建仓库",
    params: {},
  }).then((data) => {
    console.log(data);
  });
};

const tree = ref([]);

const showDropdown = ref(false);
const options = ref<DropdownOption[]>([]);
const x = ref(0);
const y = ref(0);
const defaultExpandedKeys = ref(["40", "41"]);
const handleSelect = (key: string, option: TreeOption) => {
  if (option.key == "add") {
    if (!option.data.children) {
      option.data.children = [];
    }
    option.data.children.push({
      label: "动漫",
      key: randomString(6),
      icon: "https://api.iconify.design/logos:itsalive-icon.svg?color=%2315994e",
      isMenu: false,
    });
  }
  showDropdown.value = false;
};
const handleClickoutside = () => {
  showDropdown.value = false;
};
const message = useMessage();
const nodeProps = ({ option }: { option: TreeOption }) => {
  return {
    onClick() {
      // message.info("[Click] " + option.label);
    },
    onContextmenu(e: MouseEvent): void {
      options.value = [
        option.isMenu
          ? {
              label: "添加",
              key: "add",
              data: option,
            }
          : {
              label: "更新",
              key: "update",
              data: option,
            },
        {
          label: "删除",
          key: "delete",
          data: option,
        },
      ];
      showDropdown.value = true;
      x.value = e.clientX;
      y.value = e.clientY;
      e.preventDefault();
    },
  };
};
function renderPrefix({ option }: { option: TreeOption }) {
  return h(NImage, { src: option.icon });
}
const repo = "ii3";










const getJson = (params: any) => {
  return "```json\n" + JSON.stringify(params, null, 2) + "\n```";
};
const addMenu = () => {
  let params = {
    label: "电竞",
    key: randomString(6),
    isMenu: true,
    icon: "https://api.iconify.design/logos:itsalive-icon.svg?color=%2315994e",
  };
  request("POST /repos/{owner}/{repo}/issues", {
    owner: "chendj89",
    repo: repo,
    body: JSON.stringify({
      title: params.label,
      body: getJson(params),
    }),
  });
};
const addTitle = (label: string) => {
  let params = {
    label: label,
    key: randomString(6),
    type: "title",
    icon: "https://api.iconify.design/logos:itsalive-icon.svg?color=%2315994e",
  };
  request("POST /repos/{owner}/{repo}/issues", {
    owner: "chendj89",
    repo: repo,
    body: JSON.stringify({
      title: params.label,
      body: getJson(params),
    }),
  });
};
// addTitle("动漫")
function createRepo2(repoName: string) {
  return request("POST /user/repos", {
    body: JSON.stringify({
      name: "ii3",
    }),
  });
}

// addMenu('动漫');

const delMenu = () => {
  request("PATCH /repos/{owner}/{repo}/issues/{issue_number}", {
    owner: "chendj89",
    repo: "ii3",
    issue_number: 7,
    body: JSON.stringify({
      state: "closed",
    }),
  });
};








// 获取列表
function listIssues() {
  return request("GET /repos/{owner}/{repo}/issues", {
    owner: "chendj89",
    repo: "ii3",
  });
}
function listComments() {
  return request("GET /repos/{owner}/{repo}/issues/comments", {
    owner: "chendj89",
    repo: "ii3",
  });
}
const list = async () => {
  const issues = await listIssues().then((res) => res.json());
  const comments = await listComments().then((res) => res.json());
  let list = [];
  issues.forEach((issue: any) => {
    const { url, body } = issue;
    let json = JSON.parse(body.replace("```json", "").replace("```", ""));
    let { children, ...rest } = json;
    let item = {
      ...rest,
      issueNumber: issue.number,
      children: [],
    };
    list.push(item);
    comments.forEach((comment: any) => {
      const { issue_url, body: commentBody } = comment;
      if (issue_url == url) {
        let oBody = JSON.parse(
          commentBody.replace("```json", "").replace("```", "")
        );
        item.children.push(oBody);
      }
    });
  });
  console.log(list);
  tree.value = list;
};
list();



// issue

function addIssue(opts:any){
  request("POST /repos/{owner}/{repo}/issues", {
    owner: "chendj89",
    repo: repo,
    body: JSON.stringify({
      title:opts.label,
      body: getJson(opts),
    }),
  });
}
// addIssue({
//   label:"a1",
//   key:randomString(6),
//   icon: "https://api.iconify.design/logos:itsalive-icon.svg?color=%2315994e",
//   level:1
// })

function addCommentToIssue(issueNumber:number){
  request("POST /repos/{owner}/{repo}/issues/{issue_number}/comments", {
    owner: "chendj89",
    repo: repo,
    issue_number:issueNumber,
    body: JSON.stringify({
      body: getJson({

      }),
    }),
  });
}






</script>

<style scoped></style>
