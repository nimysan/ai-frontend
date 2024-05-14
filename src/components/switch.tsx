import { useState } from "react";
import { Toggle } from "flowbite-react";

const ToggleSwitch = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    // 在这里可以执行与开关状态相关的其他操作
  };

  return (
    <Toggle
      checked={isToggled}
      onChange={handleToggle}
      className="flex items-center"
    />
  );
};

export default ToggleSwitch;
