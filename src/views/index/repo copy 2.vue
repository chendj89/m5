<template>
  <div></div>
</template>

<script setup lang="ts">
import { randomString } from "@/utils";
import request from "@/utils/fetch";
import { getIssues } from "./dialog/getIssues";
const getJson = (params: any) => {
  return "```json\n" + JSON.stringify(params, null, 2) + "\n```";
};
//
let repo = "ii3";
// 添加标题
const addIssue = (opts: any) => {
  opts.level = 1;
  return request("POST /repos/{owner}/{repo}/issues", {
    owner: "chendj89",
    repo: repo,
    body: JSON.stringify({
      title: opts.label,
      body: getJson(opts),
    }),
  });
};
const addComment = (opts: any) => {
  const { issueNumber, ...rest } = opts;
  return request("POST /repos/{owner}/{repo}/issues/{issue_number}/comments", {
    owner: "chendj89",
    repo: repo,
    issue_number: issueNumber,
    body: JSON.stringify({
      title: opts.label,
      body: getJson(rest),
    }),
  });
};
const updateComment = (opts: any) => {
  console.log("updateComment", opts);
  const { commentId, issueNumber, ...rest } = opts;
  return request("PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}", {
    owner: "chendj89",
    repo: repo,
    comment_id: commentId,
    body: JSON.stringify({
      title: opts.label,
      body: getJson(rest),
    }),
  });
};
let issue = {
  label: "直播",
  key: randomString(6),
  icon: "https://api.iconify.design/logos:itsalive-icon.svg?color=%2315994e",
  level: 1,
};
let comment: any = {
  label: "z2",
  key: randomString(6),
  icon: "https://api.iconify.design/logos:itsalive-icon.svg?color=%2315994e",
  level: 2,
  children: [],
};
const run = async (label: string) => {
  let cIssue = {
    ...issue,
    label,
  };
  // 添加问题
  let { number: issueNumber } = await addIssue(cIssue).then((res) =>
    res.json()
  );
  // 添加问题
  // 2
  let zComment = {
    ...comment,
    issueNumber,
    label: "B站",
  };
  let { id: commentId } = await addComment(zComment).then((res) => res.json());
  // 3
  let oComment = JSON.parse(JSON.stringify(zComment));
  oComment.children.push({
    ...comment,
    level: 3,
    label: "虾仁不疯狂",
  });
  oComment.children.push({
    ...comment,
    level: 3,
    label: "虾仁不疯狂",
  });
  let obj = await updateComment({
    commentId,
    ...oComment,
  });
  // 4
  let aComment = JSON.parse(JSON.stringify(oComment));
  aComment.children[0].children.push({
    ...comment,
    level: 4,
    label: "大唐帝师",
  });
  await updateComment({
    commentId,
    ...aComment,
  });
};
// run("大明"+new Date().toLocaleTimeString())

getIssues("ii3");
</script>

<style scoped></style>
