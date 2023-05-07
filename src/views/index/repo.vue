<template>
  <div>
    <n-button @click="add">添加issue</n-button>
    <n-tree :data="tree" :node-props="nodeProps"></n-tree>
    <n-dropdown
      trigger="manual"
      placement="bottom-start"
      :show="showDropdownRef"
      :options="(optionsRef as any)"
      :x="xRef"
      :y="yRef"
      @select="handleSelect"
      @clickoutside="handleClickoutside"
    />
  </div>
</template>

<script setup lang="ts">
import getIssues from "./dialog/getIssues";
import getComment from "./dialog/getComment";
import addIssue from "./dialog/addIssue";
import addComment from "./dialog/addComment";
import parseBody from "./dialog/parseBody";
import treeFindPath from "./dialog/treeFindPath";
import updateComment from "./dialog/updateComment";
import lookup from "./dialog/lookup";

const add = () => {
  let opts: IIssue = {
    label: "跑车",
    key: "跑车",
    icon: "",
    url: "",
    level: 1,
    desc: "",
    badge: { type: "success" },
  };
  addIssue("ii3", opts);
};
interface IIssue {
  label: string;
  key: string;
  icon: string;
  level: number;
  desc: string;
  badge?: any;
  url: string;
}

interface IComment extends IIssue {
  children?: IComment[];
}

const showDropdownRef = ref(false);
const optionsRef = ref<any[]>([]);
const xRef = ref(0);
const yRef = ref(0);
const handleSelect = (key: string, option: any) => {
  showDropdownRef.value = false;
  let index = lookup(tree.value, "label", option.option.label);
  if (key == "add") {
    if (index !== -1) {
      let obj = tree.value[index[0]];
      for (let i = 1; i < index.length; i++) {
        obj = obj.children[index[i]];
      }
      let item: any = {
        label: new Date().getMilliseconds(),
        key: new Date().getMilliseconds(),
        level: obj.level + 1,
        icon: "",
      };
      if (obj.level + 1 < 4) {
        item.children = [];
      }
      obj.children.push(item);
      updateComment("ii3", tree.value[index[0]].children[index[1]]);
    }
  }
  if (key == "update") {
    if (index !== -1) {
      let obj = tree.value[index[0]];
      for (let i = 1; i < index.length; i++) {
        obj = obj.children[index[i]];
      }
      obj.label = new Date().getMilliseconds();
      updateComment("ii3", tree.value[index[0]].children[index[1]]);
    }
  }
  if (key == "inset") {
    if (index !== -1) {
      let item = {
        label: new Date().getMilliseconds(),
        level: new Date().getMilliseconds(),
        icon: "",
        children: [],
      };
      tree.value[index[0]].children.push(item);
      addComment("ii3", {
        issueNumber: option.option.issueNumber,
        ...item,
      });
    }
  }
};
const handleClickoutside = () => {
  showDropdownRef.value = false;
};
const nodeProps = ({ option }: { option: any }) => {
  return {
    onContextmenu(e: MouseEvent): void {
      const { icon, ...rest } = option;
      let list = [];
      if ([1].includes(option.level)) {
        list.unshift({
          label: "插入",
          key: "inset",
          option,
        });
      }
      if ([2, 3].includes(option.level)) {
        list = [
          {
            label: "添加",
            key: "add",
            option,
          },
          {
            label: "更新",
            key: "update",
            option,
          },
          {
            label: "删除",
            key: "del",
            option,
          },
        ];
      }
      if ([4].includes(option.level)) {
        list = [
          {
            label: "更新",
            key: "update",
            option,
          },
          {
            label: "删除",
            key: "del",
            option,
          },
        ];
      }
      optionsRef.value = list;
      showDropdownRef.value = true;
      xRef.value = e.clientX;
      yRef.value = e.clientY;
      e.preventDefault();
    },
  };
};

let tree: any = ref([]);
const init = async (repo: string) => {
  let data = [];
  let issues = await getIssues(repo).then((res) => res.json());
  for (let i = 0; i < issues.length; i++) {
    const issue = issues[i];
    const issueBody = parseBody(issue.body);
    issueBody.issueNumber = issue.number;
    let comments: any = await getComment(repo, issue.number).then((res) =>
      res.json()
    );
    for (let j = 0; j < comments.length; j++) {
      let comment = comments[j];
      const commentBody = parseBody(comment.body);
      commentBody.commentId = comment.id;
      issueBody.children.push(commentBody);
    }
    data.push(issueBody);
  }
  tree.value = data;
};
init("ii3");
</script>

<style scoped></style>
