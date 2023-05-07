export default function parseBody(body: any) {
  return JSON.parse(body.replace("```json", "").replace("```", ""));
}
