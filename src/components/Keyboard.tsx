import { useEffect, useState } from "react";
import { RTUseTestType } from "../util/useTypeTest";
import "../styles/Keyboard.css";

const Keys: string[][] = [
  ["1","2","3","4","5","6","7","8","9","0","del"],
  ["q","w","e","r","t","y","u","i","o","p"],
  ["a","s","d","f","g","h","j","k","l","enter"],
  ["caps","z","x","c","v","b","n","m",",","."],
  ["space"]
];

const KeysUpper: string[][] = [
  ["!","@","#","$","%","^","&","*","(",")","del"],
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L","enter"],
  ["caps","Z","X","C","V","B","N","M",",","."],
  ["space"]
];

export const Keyboard: React.FC<{s: RTUseTestType }> = ({ s }) => {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = normalizeKey(e.key);
      setActiveKey(key);

      if (e.key === "Backspace") {
        s.deleteLetter();
      } else if (e.key === "CapsLock") {
        s.toggleCaps();
      } else if (e.key === "Shift") {
        s.dispatchUpdate({ user: { case: "upper" } });
      } else if (/^[a-zA-Z0-9., ]$/.test(e.key)){
        s.appendLetter(e.key);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setActiveKey(null); 

      if (e.key === "Shift" && s.t.user.case === "upper") {
        s.dispatchUpdate({ user: { case: "lower" } });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [s]);

  return (
    <div id="keyboard">
      {Keys.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard__row">
          {row.map((keyVal, colIndex) => (
            <Key
              key={`${rowIndex}-${colIndex}`}
              lower={keyVal}
              upper={KeysUpper[rowIndex][colIndex]}
              isActive={activeKey === keyVal}
              state={s.t.user.case}
              onClick={() => {
                s.handleKeyboardPress(s.t.user.case === "lower" ? keyVal : KeysUpper[rowIndex][colIndex])
                setActiveKey(keyVal);
                setTimeout(() => setActiveKey(null), 200);
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

function normalizeKey(key: string): string {
  if (key === " ") return "space";
  if (key === "Backspace") return "del";
  if (key === "Enter") return "enter";
  if (key === "CapsLock") return "caps";
  return key.toLowerCase();
}

interface KeyProps {
  lower: string;
  upper: string;
  state: "upper" | "lower";
  isActive: boolean;
  onClick: () => void;
}

const Key: React.FC<KeyProps> = ({ lower, upper, state, isActive, onClick }) => {
  const label = state === "lower" ? lower : upper;

  return (
    <button
      className={`keyboard__key ${isActive ? "activated" : ""}`}
      id={`k_${lower}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
