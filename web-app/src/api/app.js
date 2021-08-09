import request from "../request/index";

export const query_getMenus = () => {
  return request({
    url: "/menu",
    method: "get"
  });
};

export const query_getLogs = params => {
  return request({
    url: "/log",
    method: "get",
    params
  });
};

export const query_getEnumsLevel = params => {
  return request({
    url: "/enums",
    method: "get",
    params
  });
};
