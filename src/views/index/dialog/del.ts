import request from "@/utils/fetch";
const delMenu = (number:number) => {
  request("PATCH /repos/{owner}/{repo}/issues/{issue_number}", {
    owner: "chendj89",
    repo: "ii3",
    issue_number: number,
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
    delMenu(issue.number);
  });
};
list();
