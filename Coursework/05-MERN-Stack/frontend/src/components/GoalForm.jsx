import { useState } from 'react';
const GoalForm = ({ onCreate }) => {
  const [text, setText] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onCreate({ text: text.trim() });
    setText('');
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goals</label>
          <input
            type="text"
            name="text"
            id="text"
            placeholder="please enter a goal here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
};

export default GoalForm;