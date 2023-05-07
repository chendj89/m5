const getJson = (params: any) => {
  return "```json\n" + JSON.stringify(params, null, 2) + "\n```";
};
export default getJson;
