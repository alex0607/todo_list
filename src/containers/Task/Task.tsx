import React from 'react';
import { IconButton } from '@mui/material';
import cs from 'classnames';
import { Edit, DeleteForever, Done } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import {
  removeTask,
  toggleShowingTaskModal,
  selectCurrentTaskId,
  approveCurrentTask,
  removeCompletedTask,
} from '../../store/actions/taskLists';
import TimeLeft from '../../components/TimeLeft/TimeLeft';
import './Task.css';
import { isAfter } from 'date-fns';

type TaskType = {
  id: string;
  title: string;
  descriptions: string[];
  endTime?: string;
  completed: boolean;
};

const Task = ({ title = '', descriptions, id = '', completed = false, endTime }: TaskType) => {
  const dispatch = useDispatch();
  const [timeWasEnded, setTimeWasEnded] = React.useState(false);

  const handleRemoveTask = () => {
    if (completed) {
      dispatch(removeCompletedTask(id));
    } else {
      dispatch(removeTask(id));
    }
  };

  const handleEditTask = () => {
    dispatch(selectCurrentTaskId(id));
    dispatch(toggleShowingTaskModal());
  };

  const handleApproveTask = () => {
    dispatch(approveCurrentTask(id));
  };

  const renderDescription = (description: string, index: number) => (
    <div key={index}>{description}</div>
  );

  const timeIsEnded = isAfter(new Date(), new Date(endTime || '')) && !completed;

  return (
    <div className={cs('Task', { 'Task--completed': completed, 'Task--time-ended': timeIsEnded })}>
      {endTime && !completed && <TimeLeft endTime={endTime} />}
      <h3>{title}</h3>
      {descriptions?.length &&
        descriptions.map((desc: string, index) => renderDescription(desc, index))}
      <div className='Task__line' />
      <div className='Task__buttons'>
        {!completed && (
          <>
            <IconButton
              onClick={handleEditTask}
              color='primary'
              aria-label='edit task'
              component='label'
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={handleApproveTask}
              color='primary'
              aria-label='approve task'
              component='label'
            >
              <Done />
            </IconButton>
          </>
        )}
        <IconButton
          onClick={handleRemoveTask}
          color='primary'
          aria-label='remove task'
          component='label'
        >
          <DeleteForever />
        </IconButton>
      </div>
    </div>
  );
};

export default Task;
