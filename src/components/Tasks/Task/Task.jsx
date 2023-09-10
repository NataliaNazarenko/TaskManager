import { useDispatch } from 'react-redux';
import { deleteTask } from 'redux/tasks/operations';
import { Wrapper, Text, Button } from './Task.styled';

export const Task = ({ id, text }) => {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteTask(id));

  return (
    <Wrapper>
      <Text>{text}</Text>
      <Button type="button" onClick={handleDelete}>
        Delete
      </Button>
    </Wrapper>
  );
};