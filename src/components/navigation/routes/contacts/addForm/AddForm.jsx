// this file responsible for
import { useEffect, useState } from 'react';
import { Context } from '../../../../store/Context';
import { useContext } from 'react';
import classes from './AddForm.module.css';
import { useNavigate } from 'react-router-dom';
import { getKeyEventProps } from '@testing-library/user-event/dist/keyboard/getEventProps';

const AddForm = props => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const authContext = useContext(Context);

  const addNameHandler = event => {
    setName(event.target.value);
  };

  const addNumberHandler = event => {
    setNumber(event.target.value);
  };

  const formSubmition = async event => {
    event.preventDefault();
    await authContext.add(name, number);
    props.update();
    setName('');
    setNumber('');
  };

  return (
    <section className={classes.container}>
      <h1>{'Add Contact'}</h1>
      <form onSubmit={formSubmition}>
        <div className={classes.control}>
          <label htmlFor="name">Add Name</label>
          <input
            value={name}
            onChange={addNameHandler}
            type="name"
            id="name"
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="number">Add Number</label>
          <input value={number} onChange={addNumberHandler} type="string" />
        </div>
        <div className={classes.actions}>
          <button>{'Add'}</button>
        </div>
      </form>
    </section>
  );
};

export default AddForm;
