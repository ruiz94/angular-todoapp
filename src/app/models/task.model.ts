export interface Task {
  id: string;
  title: string;
  completed: boolean;
  editing?: boolean;
}
export type Filter = 'all' | 'completed' | 'pending';
