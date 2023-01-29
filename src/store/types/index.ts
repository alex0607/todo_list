export interface ITask {
  id: string;
  title: string;
  descriptions: string[];
  endTime?: string;
  completed: boolean;
}

export type TaskListsState = {
  tasks: ITask[] | [];
  selectedTaskId: string;
  completedTasks: ITask[] | [];
  showModal: boolean;
};

export type TaskAction = {
  type: string;
  taskId?: string;
  task?: ITask;
  initialData?: {
    tasks: ITask[];
    completedTasks: ITask[];
  };
};

export type DispatchType = (args: TaskAction) => TaskAction;

type StoreState = {
  taskLists: TaskListsState;
};

export default StoreState;
