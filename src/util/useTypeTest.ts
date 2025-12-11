import { useCallback, useEffect, useState } from "react";
export type RTUseTestType = ReturnType<typeof useTypeTest>;

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface TestData {
  text: string,
  userText: string,
  status: Status,
  timeLeft: number,
  mistakes: number,
  wpm: number
}

interface TypeTestData {
  test: TestData;
  user: {
    bestWpm: number;
    totalAccuracy: number;
    totalWpm: number;
    totalTests: number;
    totalMistakes: number;

    // user set
    wordsPerTest: number;
    midnightMode: boolean;

    case: "lower" | "upper";

    event: {
      nextEvent: number; // completedTests threshold
      onEvent: () => void;
    }
  }
}

const defaultTestData: TestData = {
  text: "",
  userText: "",
  status: "idle",
  timeLeft: -1,
  mistakes: 0,
  wpm: 0
}

const defaultData: TypeTestData = {
  test: defaultTestData,
  user: {
    bestWpm: 0,
    totalAccuracy: 0,
    totalWpm: 0,
    totalTests: 0,
    totalMistakes: 0,

    wordsPerTest: 10,
    midnightMode: true,

    case: "lower",

    event: {
      nextEvent: -1,
      onEvent: () => {}
    }
  }
}



type Status = "idle" | "testing" | "finished";

function merge<T>(target: T, src: DeepPartial<T>): T {
  const out = { ...target };
  for (const key in src) {
    const v = src[key];
    if (v && typeof v === "object" && !Array.isArray(v)) {
      out[key] = merge(target[key], v);
    } else {
      out[key] = v as any;
    }
  }
  return out;
}

export function useTypeTest() {
  const [t, setT] = useState<TypeTestData>(defaultData);

  const dispatchUpdate = useCallback(
    (updates: DeepPartial<TypeTestData>) => {
      setT(prev => merge(prev, updates));
  }, []);

  useEffect(() => {
    if (t.test.status === "finished") 
      dispatchUpdate({ test: { userText: "" }})
  }, [t.test.status, dispatchUpdate])

  const updateWpm = useCallback(
    (newWpm: number) => {
      setT(prev => {
        const setNewBest: boolean = newWpm > prev.user.bestWpm;

        return (
          { ...prev, 
            test: { 
            ...prev.test, wpm: newWpm 
            }, 
            user: { 
              ...prev.user, 
              bestWpm: setNewBest ? newWpm : prev.user.bestWpm 
            }
          }
        )
      })
    }, []);

    const toggleCaps = useCallback(() => {
      setT(prev => ({ ...prev, user: { ...prev.user, case: prev.user.case === "lower" ? "upper" : "lower" }}))
    }, []);

    const appendLetter = useCallback((char: string) => {
      setT(prev => (
        { ...prev, test: { ...prev.test, userText: prev.test.userText + char }}
      ))
    }, []);

    const handleKeyboardPress = useCallback((char: string) => {
      if (char === "del") {
        setT(prev => ({ ...prev, test: { ...prev.test, userText: prev.test.userText.slice(0, -1)}}));
      } else if (char === "enter") {
        // TODO
      } else if (char === "caps") {
        toggleCaps();
      }else {
        appendLetter(char);
      }
    }, [appendLetter, toggleCaps]);

    return {
      t,

      dispatchUpdate,
      updateWpm,

      handleKeyboardPress,
      toggleCaps,
    }
}