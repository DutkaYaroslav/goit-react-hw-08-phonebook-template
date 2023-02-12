// this file handle: add, delete, refresh contacts
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../store/Context';
import Card from '../../../UI/Card';
import AddForm from './addForm/AddForm';
import styles from './Item.module.css';

const Contacts = () => {
  const authContext = useContext(Context);
  const [itemsFetched, setItemsFethed] = useState([]);
  const [search, setSearch] = useState('');
  const [tokenIsSet, setTokenIsSet] = useState(false);

  const removeItem = async id => {
    await authContext.delete(id);
    getAllContacts();
  };

  useEffect(() => {
    getAllContacts();
  }, [search]);

  const searchHandle = e => {
    let input = e.target.value;
    setSearch(input);
  };

  const getAllContacts = async () => {
    let result = await authContext.get();
    let filteredItems = filteredContacts(result);
    setItemsFethed(filteredItems);
  };

  const filteredContacts = result => {
    let filteredItems = [];

    if (search.length === 0) {
      filteredItems = result;
    } else {
      result.forEach(element => {
        if (element.name.includes(search)) filteredItems.push(element);
      });
    }

    return filteredItems;
  };

  const items = itemsFetched.map(el => (
    <li key={el.id}>
      <div className={styles.contact}>
        <h3 className={styles.name}>{el.name}</h3>
        <div>
          <p className={styles.number}>{el.number}</p>
          <div className={styles.actions}>
            <button onClick={() => removeItem(el.id)}>delete</button>
          </div>
        </div>
      </div>
    </li>
  ));

  return (
    <Card>
      <AddForm update={getAllContacts} />
      <div className={styles.input}>
        <input onChange={searchHandle} type="name"></input>
      </div>

      <ul>{items}</ul>
    </Card>
  );
};

export default Contacts;
