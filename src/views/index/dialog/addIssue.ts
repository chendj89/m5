import request from "@/utils/fetch";
import getJson from "./getJson";
const addIssue = (repo: string, opts: any) => {
  let params = {
    ...opts,
    level: 1,
    key: opts.label,
    children: [],
  };
  const { issueNumber, commentId, ...rest } = params;
  return request("POST /repos/{owner}/{repo}/issues", {
    owner: "chendj89",
    repo: repo,
    body: JSON.stringify({
      title: params.label,
      body: getJson(rest),
    }),
  });
};

export default addIssue;
