import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { TaskList } from 'components/Tasks/TaskList';
import { TaskItem } from 'components/Tasks/TaskItem';
import { fetchTasks } from 'redux/tasks/operations';
import { getIsLoading, getError, getTasks } from 'redux/tasks/selectors';

export default function Tasks() {
  const dispatch = useDispatch();
  const tasks = useSelector(getTasks);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Your tasks</title>
      </Helmet>

      <TaskItem />

      <div>{isLoading && !error && <b>Request in progress...</b>}</div>

      {tasks.length > 0 && <TaskList />}
      
      
    </>
  );
}