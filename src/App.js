import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';
const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};
function App() {
  const [name, setname] = useState('');
  const [list, setlist] = useState(getLocalStorage());
  const [isediting, setisediting] = useState(false);
  const [editID, seteditID] = useState(null);
  const [alert, setalert] = useState({
    show: false,
    msg: '',
    type: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'danger', 'please enter value');
    } else if (name && isediting) {
      setlist(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setname('');
      seteditID(null);
      setisediting(false);
      showAlert(true, 'succes', 'value changed ! ');
    } else {
      showAlert(true, 'success', 'item added');
      const newItem = { id: new Date().getTime().toString(), title: name };
      setlist([...list, newItem]);
      setname('');
    }
  };
  const showAlert = (show = false, type = '', msg = '') => {
    setalert({ show, type, msg });
  };
  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setlist([]);
  };
  const removeItem = (id) => {
    showAlert(true, 'danger', 'please enter value');
    setlist(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const selectedItem = list.find((item) => item.id === id);
    setisediting(true);
    seteditID(id);
    setname(selectedItem.title);
  };
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}{' '}
        <h3>Grocery Bud</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='item'
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isediting ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      <div className='grocery-container'>
        <List items={list} removeItem={removeItem} editItem={editItem} />
        <button className='clear-btn' onClick={clearList}>
          clear items
        </button>
      </div>
    </section>
  );
}

export default App;
