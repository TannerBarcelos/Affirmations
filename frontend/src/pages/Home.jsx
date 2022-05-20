import { useNavigate } from 'react-router-dom';
import mental from '../assets/icons/mental.svg';
import click from '../assets/icons/click.svg';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section className='hero'>
        <div className='cta'>
          <h1 id='cta-heading'>Gain Control of Your Mental Health</h1>
          <p id='cta-slogan'>
            Put confidence in your day with just a few clicks
          </p>
          <button
            className='btn cta-start'
            onClick={(e) => navigate('/register')}
          >
            Get Started
          </button>
        </div>
        <div className='cta-2'>
          <img id='mental-img' src={mental} alt='Mental Health Image' />
        </div>
      </section>
      <section className='explain'>
        <div className='explain-image'>
          <img id='click-img' src={click} alt='Clicks' />
        </div>
        <div className='sell'>
          <h2>With a few clicks you can improve your mental health</h2>
          <p>
            By creating an affirmation and choosing your mood from a curated
            list of moods, we help you track how your mood and affirmations play
            a role in your overall mental health. At the end of the day, log
            your mood and leave a note on how your affirmation helped improve
            your day and how you approached it. The app will look back in time
            and tell you how your moods changed overtime in relation to the
            affirmations you create.
          </p>
        </div>
      </section>
    </div>
  );
};
export default Home;
