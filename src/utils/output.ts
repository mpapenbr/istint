import { sprintf } from 'sprintf-js';

/**
 * converts sec value in human readable string presentation
 * @param t value in sec
 */
export const secAsString = (t : number) : string => {    
    const minutes = Math.floor(t / 60);
    const seconds = Math.trunc(t - minutes*60)    
    return sprintf("%d:%02d", minutes, seconds);
}