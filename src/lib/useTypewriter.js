import {
  useCallback, useRef, useState,
} from 'react';

import { timeout } from '../util';

const PAUSE = 1500;
const ERASE_PAUSE = 50;
const TYPE_PAUSE = 150;

const generateSequence = (map, word, pause) => word.split('').map(map).map((token) => async () => {
  await timeout(pause);
  return token;
});

const generateTypeSequence = (word, pause) => generateSequence(
  (letter, ii) => word.substr(0, ii + 1),
  word,
  pause,
);

const generateEraseSequence = (word, pause) => generateSequence(
  (letter, ii) => word.substr(0, (word.length - 1) - ii),
  word,
  pause,
);

const createPauser = () => {
  let cancel;
  const promise = new Promise((resolve) => {
    cancel = resolve;
  });

  return {
    wait: () => promise,
    cancel,
  };
};

const useTypewriter = () => {
  const pauser = useRef();
  const isRunning = useRef(false);
  const abortController = useRef();

  const [output, setOutput] = useState('');

  const pause = useCallback(() => {
    if (pauser.current || !isRunning.current) {
      return;
    }

    pauser.current = createPauser();
  }, []);

  const resume = useCallback(() => {
    if (pauser.current) {
      pauser.current.cancel();
      pauser.current = null;
    }
  }, []);

  const renderSequence = useCallback(async (ngrams, abortSignal) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const ngram of ngrams) {
      if (abortSignal.aborted) {
        break;
      }

      if (pauser.current) {
        // eslint-disable-next-line no-await-in-loop
        await pauser.current.wait();
      }

      // eslint-disable-next-line no-await-in-loop
      const value = await ngram();

      requestAnimationFrame(() => {
        if (!abortSignal.aborted) {
          setOutput(value);
        }
      });
    }
  }, []);

  const loop = useCallback(async (items, abortSignal) => {
    if (abortSignal.aborted) {
      return;
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const item of items) {
      let ngrams = generateTypeSequence(item, TYPE_PAUSE);
      // eslint-disable-next-line no-await-in-loop
      await renderSequence(ngrams, abortSignal);
      // eslint-disable-next-line no-await-in-loop
      await timeout(PAUSE);
      ngrams = generateEraseSequence(item, ERASE_PAUSE);
      // eslint-disable-next-line no-await-in-loop
      await renderSequence(ngrams, abortSignal);
      // eslint-disable-next-line no-await-in-loop
      await timeout(PAUSE / 2);
    }

    loop(items, abortSignal);
  }, [renderSequence]);

  const start = useCallback(async (items) => {
    if (isRunning.current) {
      return;
    }

    isRunning.current = true;
    abortController.current = new AbortController();
    loop(items, abortController.current.signal);
  }, [loop]);

  const destroy = useCallback(async () => {
    if (!isRunning.current) {
      return;
    }

    setOutput('');

    isRunning.current = false;
    abortController.current.abort();
    abortController.current = null;
    pauser.current = null;
  }, []);

  return [output, start, destroy, pause, resume];
};

export default useTypewriter;
