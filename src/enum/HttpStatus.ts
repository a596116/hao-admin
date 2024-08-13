export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  /** 400 err */
  BAD_REQUEST = 400,
  /** 401 尚未登入, 請先登入帳號 */
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  /** 403 權限不足 */
  FORBIDDEN = 403,
  /** 404 請求的資源不存在 */
  NOT_FOUND = 404,

  METHOD_NOT_ALLOWED = 405,

  /** 451 請開啟小人物狀態 */
  RESUME_STATUS = 451,
  /** 452 請編輯小人物介紹 */
  RESUME_EDIT = 452,

  /** 414 請求的 URI 長度超過伺服器能夠處理的範圍 */
  URI_TOO_LONG = 414,
  /** 422 表單參數缺少 */
  UNPROCESSABLE_ENTITY = 422,
  /** 429 你的操作過於頻繁，請稍後再嘗試 */
  TOO_MANY_REQUESTS = 429,

  /** 500 服務器內部錯誤 */
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
}
