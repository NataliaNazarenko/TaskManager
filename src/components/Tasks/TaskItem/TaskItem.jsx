import { useDispatch } from 'react-redux';
import { addTask } from 'redux/tasks/operations';
import { Form, Input, Button } from './TaskItem.styled';

export const TaskItem = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const text = form.elements.text.value;
    if (text !== '') {
      dispatch(addTask(text));
      form.reset();
      return;
    }
    alert('Task cannot be empty. Enter some text!');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input name="text" />
      <Button type="submit">
        Add task
      </Button>
    </Form>
  );
};