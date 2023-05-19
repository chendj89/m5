import request from "@/utils/fetch";
import getJson from "./getJson";
const addComment = (repo: string, opts: any) => {
  let params = {
    ...opts,
    level: 2,
    key: opts.label,
    children: [],
  };
  const { issueNumber,commentId, ...rest } = params;
  return request("POST /repos/{owner}/{repo}/issues/{issue_number}/comments", {
    owner: "chendj89",
    repo: repo,
    issue_number: issueNumber,
    body: JSON.stringify({
      body: getJson(rest),
    }),
  });
};

export default addComment;
