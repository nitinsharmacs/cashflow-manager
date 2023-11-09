import { useCallback, useEffect, useState } from 'react';
import './App.css';
import NewEntry, { Category, NewEntryState } from './screens/NewEntry/NewEntry';
import CashflowService from './services/CashflowService';
import Loader from './components/Loader/Loader';
import ToastBoard from './components/ToastBoard/ToastBoard';
import Toast from './Toast';
import Login from './screens/Login/Login';

// yyyy-mm-dd => mm/dd/yyy
const format = (date: string) => {
  const [year, month, day] = date.split('-');
  return [month, day, year].join('/');
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setLoading(true);
    CashflowService.fetchCategories().then((expenseCategories) => {
      setCategories(expenseCategories);
      setLoading(false);
    });
  }, []);

  const submitHandler = useCallback(async (state: NewEntryState) => {
    const entry = { ...state };
    entry['date'] = format(entry['date']);

    setLoading(true);
    await CashflowService.create(entry);
    setLoading(false);

    Toast.insert('Created new entry successfully');
  }, []);

  return (
    <div>
      {loading ? <Loader /> : <></>}
      {/* <NewEntry onSubmit={submitHandler} categories={categories} /> */}
      <Login />
      <ToastBoard />
    </div>
  );
};

export default App;
