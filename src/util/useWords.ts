import { useCallback, useEffect, useState } from "react";

export type RTUseWords = ReturnType<typeof useWords>

function useWords() {
  const [words, setWords] = useState<string[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getWords = async (): Promise<string[] | undefined> => {
      try {
        const res = await fetch(`${process.env.PUBLIC_URL}/words/words.txt`);
        if (!res.ok) throw new Error(`failed to fetch words ${res.status}`);
        const txt = await res.text();
        const txtWords = txt.split(/\r?\n/);
        return txtWords;
      } catch (err) {
        console.error(err);
      }
    }

    const fetchWords = async () => {
      await getWords()
        .then(setWords)
        .catch(console.error);

      setLoading(false);
    }

    fetchWords();
  }, []);

  const getRandomWords = useCallback((amt: number): string[] => {
    if (!words || words.length === 0) return [];

    const rw = new Array<string>(amt);

    for (let i = 0; i < amt; i++) {
      const index = Math.floor(Math.random() * words.length);
      rw[i] = words[index];
    }

    return rw;
  }, [words]);


  return {
    words,
    loading,
    getRandomWords
  };
}

export default useWords;