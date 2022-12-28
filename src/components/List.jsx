import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Button from './UI/button';

const List = ({ items, onRemove, onEdit }) => {
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="grocery-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <Button type="button" css="edit-btn" onClick={() => onEdit(id)}>
                <FaEdit />
              </Button>
              <Button
                type="button"
                css="delete-btn"
                onClick={() => onRemove(id)}
              >
                <FaTrash />
              </Button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
