/** APIレスポンスのベース */
export interface APIResponse<T> {
  items: T[];
}

/** APIエラー時のレスポンス */
export interface APIErrorResponse {
  status: number;
  message: string;
}

/** (共通)priority定義 */
export type TodoPriority = 1 | 2 | 3 | 4 | 5;

export namespace Tables {
  /** Todoリストのレコード */
  export interface TodoRecord {
    id: string;
    title: string;
    description?: string;
    done: number;
    priority?: TodoPriority;
  }
}

/** Todoリストのアイテム */
export interface TodoItem {
  id: string;
  title: string;
  description?: string;
  priority?: TodoPriority;
  done: boolean;
}

export namespace StatusCode {
  export const OK = 200;
  export const BAD_REQUEST = 400;
  export const INTERNAL_SERVER_ERROR = 500;
}

export namespace ContentType {
  export const APPLICATION_JSON = 'application/json;charset=UTF-8';
}
