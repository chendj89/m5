import request from "@/utils/fetch";
export default function getIssues(repo: string) {
  return request("GET /repos/{owner}/{repo}/issues", {
    owner: "chendj89",
    repo: repo,
  });
}
