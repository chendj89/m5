import request from "@/utils/fetch";
export default function treeFindPath(
  tree: any,
  func: any,
  field: any = "",
  path: any = []
) {
  if (!tree) return [];
  for (const data of tree) {
    // 二选一 返回完整节点
    //  path.push(data)
    // 二选一
    field === "" ? path.push(data) : path.push(data[field]);
    if (func(data)) return path;
    if (data.children) {
      const findChildren: any = treeFindPath(data.children, func, field, path);
      if (findChildren.length) return findChildren;
    }
    path.pop();
  }
  return [];
}
