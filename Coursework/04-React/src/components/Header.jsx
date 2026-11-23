import Button from './Button';

const Header = ({ title = 'Study Planner', onAdd, showAdd }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        color={showAdd ? '#dc2626' : '#16a34a'}
        text={showAdd ? 'Close' : 'Add'}
        onClick={onAdd}
      />
    </header>
  );
};

export default Header;