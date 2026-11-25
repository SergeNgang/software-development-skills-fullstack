const GoalItem = ({ goal, onDelete }) => {
  return (
    <div className="goal">
      <div className="date">
        {new Date(goal.createdAt).toLocaleString('en-US')}
      </div>
      <h2>{goal.text}</h2>
      <button onClick={() => onDelete(goal._id)} className="close">
        X
      </button>
    </div>
  );
};
export default GoalItem;