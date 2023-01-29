import * as React from 'react';
import { TextField, Modal, Box, IconButton, Button, Switch, FormControlLabel } from '@mui/material';
import { RemoveCircle } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useSelector, useDispatch } from 'react-redux';
import StoreState, { ITask } from '../../store/types';
import isEqual from 'lodash.isequal';
import {
  addTask,
  toggleShowingTaskModal,
  selectCurrentTaskId,
  updateCurrentTask,
} from '../../store/actions/taskLists';
import './CustomModal.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  border: '2px solid #000',
  background: 'white',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 5,
  boxShadow: 24,
  alignItems: 'center',
  p: 4,
};

function CustomModal() {
  const showModal: boolean = useSelector((state: StoreState) => state.taskLists.showModal);
  const dispatch = useDispatch();
  const selectedTaskId: string = useSelector((state: StoreState) => state.taskLists.selectedTaskId);
  const tasks: ITask[] = useSelector((state: StoreState) => state.taskLists.tasks);
  const [endTime, setEndTime] = React.useState(dayjs().format('YYYY-MM-DDTHH:mm'));
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const handleChange = (newEndTIme: Dayjs | null) => {
    setEndTime((newEndTIme || dayjs()).format('YYYY-MM-DDTHH:mm'));
  };
  const [title, setTitle] = React.useState('');
  const [descriptions, setDescriptions] = React.useState(['']);

  React.useEffect(() => {
    if (showModal && selectedTaskId) {
      const currentTask = tasks.find((task: ITask) => task.id === selectedTaskId);
      if (title !== currentTask?.title && !isEqual(currentTask?.descriptions, descriptions)) {
        setTitle(currentTask?.title || '');
        setDescriptions(currentTask?.descriptions || ['']);
        if (currentTask?.endTime && !showDatePicker) {
          setShowDatePicker(true);
          setEndTime(currentTask?.endTime);
        }
      }
    }
  }, [showModal, selectedTaskId]);

  const handleChangeTaskOption =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newDescriptions = [...descriptions];
      newDescriptions[index] = String(e.target.value);
      setDescriptions(newDescriptions);
    };

  const handleRemoveOption = (currentIndex: number) => () => {
    setDescriptions(descriptions.filter((option: string, index: number) => index !== currentIndex));
  };

  const handleAddNewOption = () => {
    setDescriptions([...descriptions, '']);
  };

  const handleClose = () => {
    dispatch(toggleShowingTaskModal());
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const renderTaskDescription = (index = 0, description = '') => (
    <div key={index} className='CustomModal__description'>
      <TextField
        onChange={handleChangeTaskOption(index)}
        value={description}
        id='outlined-basic'
        label='Enter subtask title'
        variant='outlined'
      />
      <IconButton
        onClick={handleRemoveOption(index)}
        color='error'
        aria-label='remove option'
        component='label'
      >
        <RemoveCircle />
      </IconButton>
    </div>
  );

  const handleCreateOrEditTask = () => {
    const newTask: ITask = {
      title,
      completed: false,
      endTime: showDatePicker ? endTime : '',
      id: selectedTaskId || String(new Date().getTime()),
      descriptions,
    };
    if (selectedTaskId) {
      dispatch(updateCurrentTask(newTask));
      dispatch(selectCurrentTaskId(''));
    } else {
      dispatch(addTask(newTask));
    }
    dispatch(toggleShowingTaskModal());
    setTitle('');
    setDescriptions(['']);
    setEndTime(dayjs().format('YYYY-MM-DDTHH:mm'));
    setShowDatePicker(false);
  };

  const handleToggleShowDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const disableSaving = () => {
    return !title || descriptions.some((desc: string) => !desc);
  };

  const disabledSaving = disableSaving();

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <h3>Add new task</h3>
        <TextField
          className='CustomModal__title-input'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id='outlined-basic'
          label='Enter task title'
          variant='outlined'
        />
        {descriptions.map((description, index) => renderTaskDescription(index, description))}
        <Button
          className='CustomModal__add-button'
          onClick={handleAddNewOption}
          variant='contained'
          color='secondary'
        >
          Add new subtask
        </Button>

        <FormControlLabel
          className='CustomModal__Switch'
          control={
            <Switch
              checked={showDatePicker}
              onChange={handleToggleShowDatePicker}
              name='show datepicker'
            />
          }
          label='Set end date and time for task'
        />
        {showDatePicker && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              className='CustomModal__DatePicker'
              label='Date&Time picker'
              value={endTime}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        )}
        {disabledSaving && <div className='CustomModal__help-text'>* Please enter all data</div>}
        <div className='CustomModal__buttons'>
          <Button
            className='CustomModal__cancel-button'
            variant='contained'
            color='secondary'
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button disabled={disabledSaving} variant='contained' onClick={handleCreateOrEditTask}>
            {selectedTaskId ? 'Update task' : 'Create new task'}
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default CustomModal;
