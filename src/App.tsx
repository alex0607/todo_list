import React, { useEffect } from 'react'
import LeftColumn from './containers/LeftColumn/LeftColumn';
import RightColumn from './containers/RightColumn/RightColumn';
import CustomModal from './components/CustomModal/CustomModal';
import { useDispatch } from 'react-redux';
import { loadInitialData } from './store/actions/taskLists';
import './App.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const initialDataJSON = window.localStorage.getItem('todoListData') || '';
    if (initialDataJSON) {
      const initialData = JSON.parse(initialDataJSON);
      dispatch(loadInitialData(initialData));
    }
  }, []);
  return (
    <div className='App'>
      <h1>Your worksheet!</h1>
      <div className='App__columns-wrapper'>
        <LeftColumn />
        <RightColumn />
      </div>
      <CustomModal />
    </div>
  );
}

export default App;
