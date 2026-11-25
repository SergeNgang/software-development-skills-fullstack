import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GoalForm from '../components/GoalForm';
import GoalItem from '../components/GoalItem';
import Spinner from '../components/Spinner';
import { getGoals, createGoal, deleteGoal } from '../services/api';
const Dashboard = ({ user }) => {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchGoals = async () => {
      try {
            const data = await getGoals(user.token);
            setGoals(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Goals couldnt load, refresh page please');
        } finally {
            setIsLoading(false);
        }
    };

    fetchGoals();
  }, [user, navigate]);

  const handleCreateGoal = async (goalData) => {
    try {
      const newGoal = await createGoal(goalData, user.token);
      setGoals((prev) => [...prev, newGoal]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create your goal, please try again');
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await deleteGoal(id, user.token);
      setGoals((prev) => prev.filter((goal) => goal._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Your goal couldnt be deleted, please try again');
    }
  };

  if (!user) return null;
  if (isLoading) return <Spinner />;

  return (
    <>
      <section className="heading">
        <h1>Welcome {user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      {error && <div className="error-msg">{error}</div>}

      <GoalForm onCreate={handleCreateGoal} />

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem
                key={goal._id}
                goal={goal}
                onDelete={handleDeleteGoal}
              />
            ))}
          </div>
        ) : (
          <h3>Please try setting a goal</h3>
        )}
      </section>
    </>
  );
};
export default Dashboard;