import { RTUseTestType } from '../util/useTypeTest';
import '../styles/TypeTest.css';
import { RTUseWords } from '../util/useWords';
import { useEffect } from 'react';

export const TypeTest: React.FC<{ s: RTUseTestType, w: RTUseWords }> = ({ s, w }) => {

  useEffect(() => {
    s.dispatchUpdate({
      test: {
        text: w.getRandomWords(s.t.user.wordsPerTest).join(" "), 
        words: w.getRandomWords(s.t.user.wordsPerTest) 
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s.t.user.wordsPerTest]);

  if (!w.words || w.loading) return <div id="loading"> loading ... </div>;

  return (
    <div id="test">
      {s.t.test.text}
    </div>
  )
}

interface WordProps {
  word: string;
  index: number;
}

const Word: React.FC<WordProps> = ({ word, index }) => {

  return (
    <div className="tt__word">
      {word.split("").map((w, i) => {
        return (
          <span key={i} id={`${index}-${i}`}>{w}</span>
        )
      })}
    </div>
  )
}