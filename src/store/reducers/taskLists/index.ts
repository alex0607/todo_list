import * as constants from '../../constants/taskLists';
import * as types from '../../types';
import { ITask } from '../../types';

const defaultTask: types.ITask = {
  id: '',
  title: '',
  descriptions: [''],
  completed: false,
  endTime: '',
};

const saveUpdatedData = (tasks: ITask[], completedTasks: ITask[]) => {
  const todoListData: { tasks: ITask[]; completedTasks: ITask[] } = {
    tasks,
    completedTasks,
  };

  window.localStorage.setItem('todoListData', JSON.stringify(todoListData));
};

const initialState: types.TaskListsState = {
  tasks: [],
  completedTasks: [],
  selectedTaskId: '',
  showModal: false,
};

const reducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: types.TaskListsState = initialState,
  action: types.TaskAction,
): types.TaskListsState => {
  switch (action.type) {
    case constants.ADD_NEW_TASK:
      const tasksWithNewOne = action.task ? [...state.tasks, action.task] : state.tasks;
      saveUpdatedData(tasksWithNewOne, state.completedTasks);
      return {
        ...state,
        tasks: tasksWithNewOne,
      };
    case constants.REMOVE_TASK:
      const tasksWithoutCurrent =
        state.tasks.filter((task: types.ITask) => task.id !== action.taskId) || [];
      saveUpdatedData(tasksWithoutCurrent, state.completedTasks);
      return {
        ...state,
        tasks: tasksWithoutCurrent,
      };
    case constants.REMOVE_COMPLETED_TASK:
      const completedTasksWithoutCurrent =
        state.completedTasks.filter((task: types.ITask) => task.id !== action.taskId) || [];
      saveUpdatedData(state.tasks, completedTasksWithoutCurrent);
      return {
        ...state,
        completedTasks: completedTasksWithoutCurrent,
      };
    case constants.SET_UPDATED_TASK_ID:
      return {
        ...state,
        selectedTaskId: action.taskId || '',
      };

    case constants.TOGGLE_SHOWING_TASK_MODAL:
      return {
        ...state,
        showModal: !state.showModal,
      };

    case constants.UPDATE_TASK:
      const tasksWithUpdatedOne = state.tasks.map((task: types.ITask) => {
        if (task.id === action?.task?.id) {
          return action.task;
        } else {
          return task;
        }
      });
      saveUpdatedData(tasksWithUpdatedOne, state.completedTasks);
      return {
        ...state,
        tasks: tasksWithUpdatedOne,
      };

    case constants.APPROVE_TASK:
      const tasksWithoutApprovedTask = [...state.tasks].filter(
        (task: types.ITask) => task.id !== action?.taskId,
      );
      const currentTask: types.ITask =
        state.tasks.find((task: types.ITask) => task.id === action?.taskId) || defaultTask;
      const completedTasksWithApprovedTask = [
        ...state.completedTasks,
        { ...currentTask, completed: true },
      ];
      saveUpdatedData(tasksWithoutApprovedTask, completedTasksWithApprovedTask);
      return {
        ...state,
        tasks: tasksWithoutApprovedTask,
        completedTasks: completedTasksWithApprovedTask,
      };

    case constants.LOAD_INITIAL_DATA:
      return {
        ...state,
        tasks: action.initialData?.tasks || [],
        completedTasks: action.initialData?.completedTasks || [],
      };

    default:
      return state;
  }
};

export default reducer;
