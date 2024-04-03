import style from './toggle.module.css';
import { ToggleProps } from '../dataInterface';

const Toggle: React.FC<ToggleProps> = ({ handleDarkMode, isDarkMode }) => {
  return (
    <button type="button" onClick={handleDarkMode} className={style.toggleButton}>
      {isDarkMode ? "Dark Mode" : "Light Mode"}
    </button>
  );
};

export default Toggle;