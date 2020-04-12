//包含n个接口请求函数的模块（每个函数返回的都时promise对象）
import './ajax'
import ajax from "./ajax"
//用户有关api
const register = (user) => ajax('/user/register',user,"POST")
const login = (certification) => ajax('/user/login',certification,"POST")
const autoLogin = (certification) => ajax('/user/autoLogin',certification,"POST")
//考卷有关api
const getTestPapersForAdmin = (userId) => ajax('/testPaper/getTestPapersForAdmin',userId)
const getTestPapersForExaminee = (userIdAanSearch) => ajax('/testPaper/getTestPapersForExaminee',userIdAanSearch)
const getTestPaperNotTest = (userIdAanSearch) => ajax('/testPaper/getTestPaperNotTest',userIdAanSearch)
const handInTestPaper = (userTestPaper) => ajax('/testPaper/handInTestPaper',userTestPaper,'POST')
const addTestPaper = (testPaperAndUserId) => ajax('/testPaper/addTestPaper',testPaperAndUserId,'POST')
const removeTestPaper = (testPaperIdAndUserId) => ajax('/testPaper/removeTestPaper',testPaperIdAndUserId,'POST')
const updateTestPaper = (testPaper) => ajax('/testPaper/updateTestPaper',testPaper,'POST')
const isRelease = (userTestPaperIdAndIsRelease) => ajax('/testPaper/isRelease',userTestPaperIdAndIsRelease,'POST')
//考题有关api
const addQuestion = (question) => ajax('/question/addQuestion',question,'POST')
const addQuestionToTestPaper = (questionAndTestPaperId) => ajax('/question/addQuestionToTestPaper',questionAndTestPaperId,'POST')
const addQuestionToTestPaperFromBank = (testPaperQuestionAndUserId) => ajax('/question/addQuestionToTestPaperFromBank',testPaperQuestionAndUserId,'POST')
const deleteFromTestPaper = (testPaperQuestion) => ajax('/question/deleteFromTestPaper',testPaperQuestion,'POST')
const deleteQuestion = (questionIdAndUserId) => ajax('/question/deleteQuestion',questionIdAndUserId)
const updateQuestion = (question) => ajax('/question/updateQuestion',question,'POST')
const getQuestions = (userId) => ajax('/question/getQuestions',userId)
const getQuestionsByTestPaperId = (testPaperId) => ajax('/question/getQuestionsByTestPaperId',testPaperId)
const getQuestionsNotInTestPaperId = (testPaperIdAndUserId) => ajax('/question/getQuestionsNotInTestPaperId',testPaperIdAndUserId)



//export default 只能存在一个 导入不需要加{}
// export可以存在多个 导入一定要加{ }
export {
    register,
    login,
    autoLogin,
    addTestPaper,
    getTestPapersForAdmin,
    getTestPapersForExaminee,
    removeTestPaper,
    updateTestPaper,
    isRelease,
    addQuestion,
    getQuestions,
    getQuestionsByTestPaperId,
    addQuestionToTestPaper,
    getQuestionsNotInTestPaperId,
    addQuestionToTestPaperFromBank,
    deleteFromTestPaper,
    deleteQuestion,
    updateQuestion,
    getTestPaperNotTest,
    handInTestPaper,
}

