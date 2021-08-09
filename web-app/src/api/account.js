import request from "../request/index";

export function login(data) {
  return request({
    url: "/login",
    method: "post",
    data
  });
}

export function signup(data) {
  return request({
    url: "/signup",
    method: "post",
    data
  });
}
export function editAccount(data) {
  return request({
    url: "/editAccount",
    method: "post",
    data
  });
}

export function deleteAccount(data) {
  return request({
    url: "/deleteAccount",
    method: "post",
    data
  });
}

export function logout() {
  return request({
    url: "logout",
    method: "get"
  });
}

export function getuserInfo() {
  return request({
    url: "/getUserInfo",
    method: "get"
  });
}

export function getAccountList() {
  return request.get("/accountList");
}

export function getResList() {
  return request.get("/getResList");
}
