import styles from './UserProfile.module.css';
import { Context } from '../../../store/Context';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  let [email, setEmail] = useState('');
  useEffect(() => {
    let isEmail = localStorage.getItem('email');

    if (!isEmail) return;
    setEmail(isEmail);
  }, [email]);

  const navigate = useNavigate();

  return (
    <section className={styles.profile}>
      <h1>{email} Profile</h1>
    </section>
  );
};

export default UserProfile;
