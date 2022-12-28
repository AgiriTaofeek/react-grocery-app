import { useState, useEffect } from 'react';
import List from './components/List';
import Alert from './components/Alert';
import Button from './components/UI/button';
import Input from './components/UI/Input';

const getLocalStorage = () => {
  let localList = localStorage.getItem('list');
  if (localList) return JSON.parse(localStorage.getItem('list'));
  if (!localList) return [];
};
function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage()); //* Using a function to initialize because we don't want list to be overwritten to an empty array anytime the App component is re-rendered due to other state changes in this component. we want it to be initialized based on certain conditions
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    type: '',
    msg: '',
  });

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, 'danger', 'Item Removed');
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const editingItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(editingItem.title);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      //* display alert
      showAlert(true, 'danger', 'please enter a value');
    } else if (name && isEditing) {
      //* edit
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'Edited successfully');
    } else {
      //* show alert
      showAlert(true, 'success', 'Item added');
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('');
    }
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} onCleanUp={showAlert} list={list} />}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <Input
            type="text"
            css="grocery"
            place="e.g Bread"
            val={name}
            onChange={handleChange}
          />
          <Button type="submit" css="submit-btn">
            {isEditing ? 'Edit' : 'Submit'}
          </Button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} onRemove={removeItem} onEdit={editItem} />
          <Button css="clear-btn" onClick={clearList}>
            Clear Items
          </Button>
        </div>
      )}
    </section>
  );
}

export default App;
