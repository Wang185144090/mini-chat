import request from '../../../utils/request.js'
//本地地址
const ApiRootUrl = 'http://127.0.0.1:9030/';

const loginRequest = data => {
  return request.post(ApiRootUrl + '/user/login', data)
}

const registerRequest = data => {
  return request.post(ApiRootUrl + '/user/addUser', data)
}

export default {
  loginRequest,
  registerRequest
}
