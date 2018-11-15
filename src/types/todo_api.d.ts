export type TodoPriority = 1 | 2 | 3 | 4 | 5;

export interface TodoItem {
  id: string;
  title: string;
  description?: string;
  priority?: TodoPriority;
  done: boolean;
}

export interface APIResponse {
  items: any[];
}
