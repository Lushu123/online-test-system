//包含n个接口请求函数的模块（每个函数返回的都时promise对象）
import './ajax'
import ajax from "./ajax"

//请求注册
const register = (user) => ajax('/user/register',user,"POST")
const login = (certification) => ajax('/user/login',certification,"POST")
const autoLogin = (id) => ajax('/user/autoLogin',id)
const addTestPaper = (testPaperAndUserId) => ajax('/testPaper/addTestPaper',testPaperAndUserId,'POST')



//export default 只能存在一个 导入不需要加{}
// export可以存在多个 导入一定要加{ }
export {
    register,
    login,
    autoLogin,
    addTestPaper
}

