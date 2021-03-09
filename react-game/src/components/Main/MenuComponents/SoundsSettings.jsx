const SoundSettings = ({
  isSoundOn,
  isMusicOn,
  changeSoundState,
  changeMusicState,
  soundValue,
  musicValue,
  setMusicValue,
  setSoundValue,
  setVolumeSound,
  setVolumeAudio,
  formatVolume,
}) => {

  return (
    <div className='sound__settings'>
      <div className='sound__block'>
        <h3>Music Settings:</h3>
        <div className='sound__range_icon'>
          <div className='sound'>
            <div
              className={isMusicOn ? 'music__icon on' : 'music__icon off'}
              onClick={changeMusicState}
            />
          </div>
          <div className='sound__range'>
            <input
              type="range"
              id="music"
              name="music"
              min="0"
              max="1"
              step='0.01'
              value={musicValue}
              onChange={(event) => {
                setMusicValue(event.target.value);
                setVolumeAudio();
              }}
              disabled={!musicValue}
            />
            <label htmlFor="music">{formatVolume(musicValue)}</label>
          </div>
        </div>
      </div>
      <div className='sound__block'>
        <h3>Sound Settings:</h3>
        <div className='sound__range_icon'>
          <div className='sound'>
            <div
              className={isSoundOn ? 'sound__icon on' : 'sound__icon off'}
              onClick={changeSoundState}
            />
          </div>
          <div className='sound__range'>
            <input type="range"
              id="sound"
              name="sound"
              className="sound__range"
              min="0"
              max="1"
              step='0.01'
              value={soundValue}
              onChange={(event) => {
                setSoundValue(event.target.value);
                setVolumeSound();
              }}
              disabled={!soundValue}
            />
            <label htmlFor="sound">{formatVolume(soundValue)}</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SoundSettings;