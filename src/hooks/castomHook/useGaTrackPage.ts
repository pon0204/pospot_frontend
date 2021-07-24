import { useEffect } from 'react'
import ReactGA from 'react-ga';

ReactGA.initialize('UA-142122912-5');

const useGaTrackPage = (path: string) => {
  useEffect(() => {
    ReactGA.pageview(path);
  }, [path])
}

export default useGaTrackPage