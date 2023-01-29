import * as constants from '../../constants/taskLists';
import * as types from '../../types';

export function addTask(task: types.ITask) {
  return {
    type: constants.ADD_NEW_TASK,
    task,
  };
}

export function removeTask(taskId: string) {
  return {
    type: constants.REMOVE_TASK,
    taskId,
  };
}

export function removeCompletedTask(taskId: string) {
  return {
    type: constants.REMOVE_COMPLETED_TASK,
    taskId,
  };
}

export function selectCurrentTaskId(taskId: string) {
  return {
    type: constants.SET_UPDATED_TASK_ID,
    taskId,
  };
}

export function approveCurrentTask(taskId: string) {
  return {
    type: constants.APPROVE_TASK,
    taskId,
  };
}

export function toggleShowingTaskModal() {
  return {
    type: constants.TOGGLE_SHOWING_TASK_MODAL,
  };
}

export function updateCurrentTask(task: types.ITask) {
  return {
    type: constants.UPDATE_TASK,
    task,
  };
}

export function loadInitialData(initialData: {
  tasks: types.ITask[];
  completedTasks: types.ITask[];
}) {
  return {
    type: constants.LOAD_INITIAL_DATA,
    initialData,
  };
}
