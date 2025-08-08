import {effect, signal} from '@maverick-js/signals';    
import { useCallback, useSyncExternalStore } from 'react';

export const $count = signal(0);

export const increment = () => {
  $count.set($count() + 1);
}

export const useSignalValue = (signal) => {
  const subscribe = useCallback(callback => effect(() => callback(signal())), []);
  return useSyncExternalStore(subscribe, signal, signal);
};