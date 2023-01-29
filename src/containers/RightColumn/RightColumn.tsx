import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import Task from '../Task/Task';
import StoreState, { ITask } from '../../store/types';

function RightColumn() {
  const completedTasks: ITask[] = useSelector(
    (state: StoreState) => state.taskLists.completedTasks,
  );

  return (
    <div className='LeftColumn'>
      <h2>Completed tasks</h2>
      <div className='LeftColumn__body'>
        {completedTasks.map((task: ITask, index: number) => (
          <Task
            title={task.title}
            descriptions={task.descriptions}
            endTime={task.endTime}
            completed={task.completed}
            id={task.id}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default RightColumn;
