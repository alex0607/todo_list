import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { toggleShowingTaskModal } from '../../store/actions/taskLists';
import Task from '../Task/Task';
import StoreState, { ITask } from '../../store/types';
import './LeftColumn.css';

function LeftColumn() {
  const tasks: ITask[] = useSelector((state: StoreState) => state.taskLists.tasks);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(toggleShowingTaskModal());
  };

  return (
    <div className='LeftColumn'>
      <h2>Tasks to be completed</h2>
      <Button variant='contained' onClick={handleOpenModal}>
        Add new task
      </Button>
      <div className='LeftColumn__body'>
        {tasks.map((task: ITask) => (
          <Task
            title={task.title}
            descriptions={task.descriptions}
            endTime={task.endTime}
            completed={task.completed}
            id={task.id}
            key={task.id}
          />
        ))}
      </div>
    </div>
  );
}

export default LeftColumn;
