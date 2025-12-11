import { Keyboard } from '../components/Keyboard';
import { TypeTest } from '../components/TypeTest';
import { RTUseTestType } from '../util/useTypeTest';
import { RTUseWords } from '../util/handleWords';
import '../styles/Main.css'

const NUM_WORDS = [
  5,
  10,
  20,
  50,
  100
]


const Main: React.FC<{ s: RTUseTestType, w: RTUseWords }> = ({ s, w }) => {
  const {
    t,
    dispatchUpdate,
  } = s;
  
  return (
    <main>
      <header>
        <div id="logo">
          <a id="logo-img" href="https://midnight.hackclub.com" target="_blank" rel="noreferrer">
            <img src="images/frame_8.png" alt="logo"/>
          </a>
          <div id="logo-text">type</div>
        </div>
        <div id="button-dock" className={`${t.test.status === "testing" ? "disabled" : ""}`}>
          {NUM_WORDS.map((num, i) => 
            <button className={`bd__btn ${t.user.wordsPerTest === num ? "bdb__selected" : ""}`} key={i.toString()}
              onClick={() => dispatchUpdate({ user: { wordsPerTest: num }})}
            >
              {num}
            </button>
          )}
          <div className="separator"></div>
        </div>
      </header>
      <div id="typing-test">
        <TypeTest {...s}/>
        <Keyboard s={s} w={w}/>
      </div>
    </main>
  )
}

export default Main;