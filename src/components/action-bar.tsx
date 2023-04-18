import { useActions } from "../hooks/use-actions";
import './action-bar.css';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div className="action-bar">
      <button
        onClick={() => moveCell(id, "up")}
        className="button is-info is-small"
      >
        <span className="icon">
          <i className="fas fa-arrow-up " />
        </span>
      </button>
      <button
        onClick={() => moveCell(id, "down")}
        className="button is-info is-small"
      >
        <span className="icon">
          <i className="fas fa-arrow-down" />
        </span>
      </button>
      <button
        onClick={() => deleteCell(id)}
        className="button is-danger is-small"
      >
        <span className="icon">
          <i className="fas fa-times" />
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
