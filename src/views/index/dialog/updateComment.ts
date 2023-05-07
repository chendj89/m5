import request from "@/utils/fetch";
import getJson from "./getJson";
const updateComment = (repo: string, opts: any) => {
  const { commentId, issueNumber, ...rest } = opts;
  return request("PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}", {
    owner: "chendj89",
    repo: repo,
    comment_id: commentId,
    body: JSON.stringify({
      body: getJson(rest),
    }),
  });
};

export default updateComment;
