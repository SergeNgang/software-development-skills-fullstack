import Goal from '../models/goalModel.js';
// @desc  use to  Get goals
    const getGoals = async (req, res, next) => {
    try {
        const goals = await Goal.find({ user: req.user.id });
        res.status(200).json(goals);
    } catch (error) {
        next(error);
    }
};

// @desc  use to  Set goals

const setGoal = async (req, res, next) => {
  try {
    if (!req.body.text) {
      res.status(400);
      throw new Error('Please add a text field');
    }

    const goal = await Goal.create({
      text: req.body.text,
      user: req.user.id,
    });

    res.status(200).json(goal);
  } catch (error) {
    next(error);
  }
};

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findById(req.params.id);

        if (!goal) {
        res.status(400);
        throw new Error('Goal not found');
        }

    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

                if (goal.user.toString() !== req.user.id) {
                res.status(401);
                throw new Error(' User not authorized');
                }

    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedGoal);
  } catch (error) {
    next(error);
  }
};

// @desc  is what i have set up to  delete a  goal
// @access  Private
const deleteGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findById(req.params.id);

        if (!goal) {
        res.status(400);
        throw new Error('Goal not found');
        }

        if (!req.user) {
        res.status(401);
        throw new Error(' User not found');
        }

    if (goal.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error(' User not authorized');
    }

    await goal.deleteOne();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

export { getGoals, setGoal, updateGoal, deleteGoal };