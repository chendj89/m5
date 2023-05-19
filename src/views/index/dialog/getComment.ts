import request from "@/utils/fetch";
export default function getComment(repo: string, issue_number: number) {
  return request("GET /repos/{owner}/{repo}/issues/{issue_number}/comments", {
    owner: "chendj89",
    repo: repo,
    issue_number,
  });
}
