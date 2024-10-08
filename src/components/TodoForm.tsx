import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Todo } from '../types/todo';
import { useTodoStore } from '../stores/todoStore';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';

export const TodoForm = () => {

  const [formData, setFormData] = useState<Partial<Todo>>({
    title: '',
    description: '',
  });

  const addTodo = useTodoStore((state) =>  state.addTodo);
  const editTodo = useTodoStore((state) => state.editTodo);
  const currentTodo = useTodoStore((state) => state.currentTodo);
  const setCurrentTodo = useTodoStore((state) =>  state.setCurrentTodo);

  const [error, setError] = useState('');

  useEffect(() => {
    if (currentTodo) {
      setFormData({
        title: currentTodo.title || '',
        description: currentTodo.description || '',
      });
    }
  }, [currentTodo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!formData.title?.trim()){
      setError(`Fill the 'Title' field !!`);
      return;
    }

    const newTodo: Todo = {
      _id: nanoid(), 
      title: formData.title || '',
      description: formData.description || '',
      isCompleted: false,
      createdAt: new Date(),
    };

    setError('');
    setFormData({ title : '', description : ''})
    addTodo(newTodo)
    
  };

  const handleEditTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title?.trim()) {
      setError(`Fill the 'Title' field !!`);
      return;
    }

    const updatedTodo: Partial<Todo> = {
      title: formData.title || '',
      description: formData.description || '',
    };

    if (currentTodo?._id) {
      editTodo(currentTodo._id, updatedTodo);
    }

    setError('');
    setFormData({ title: '', description: '' });
    setCurrentTodo?.(null)

    
  };

  return (
    <form 
    onSubmit={currentTodo ? handleEditTodo : handleAddTodo}
    className="mt-4 space-y-4 bg-slate-800 p-6 rounded-xl text-white overflow-hidden">

      {error && <p className="text-red-600 text-center">{error}</p>}

      <div>
        <Label className='text-xl md:text-2xl text-neutral-400 flex' htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title || ''}
          onChange={handleChange}
          className='bg-white text-black text-lg'
        />
      </div>
      <div>
        <Label className='text-xl md:text-2xl text-neutral-400 flex' htmlFor="description">Description</Label>
        <Input
          id="description"
          value={formData.description || ''}
          className='bg-white text-black text-lg'
          onChange={handleChange}
        />
      </div>
      <Button className={`px-12 py-6 text-xl ${currentTodo? 'bg-green-500' : 'bg-zinc-500'}`} type="submit">
        {currentTodo ? 'Update Todo' : 'Add Todo'}
      </Button>
    </form>
  );
}