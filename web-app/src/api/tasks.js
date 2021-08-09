import request from "../request/index";


export const createTask = data => {
  return request({
    url: "/createTask",
    method: "post",
    data
  });
};

export const taskList = params => {
  return request({
    url: "/taskList",
    method: "get",
    params
  });
};

export const taskDetail = params => {
  return request({
    url: "/task/detail",
    method: "get",
    params
  });
};

export const changTaskStatus = data => {
  return request({
    url:'/task/changTaskStatus',
    method:'post',
    data
  })
}

export const addChangeLog = data => {
  return request({
    url:'/task/changeLog',
    method:'post',
    data
  })
}

export const getChangeLogs = params => {
  return request({
    url:'/task/getChangeLogs',
    method:'get',
    params
  })
}

export const changeResPerson = data => {
  return request({
    url:'/task/changeResPerson',
    method:'post',
    data
  })
}

export const getAllTasks = () => {
  return request({
    url:'/task/allList',
    method:'get'
  })
}

export const changeFlow = (data) => {
  return request({
    url:'/task/ing/changeFlow',
    method:'post',
    data
  })
}