
import 'gulp';
import * as Undertaker from 'undertaker';

declare module 'gulp' {
    export interface Gulp {
        /**
         * Returns the registered function.
         * @param {string} taskName - Task name.
         */
        task(taskName: string): Undertaker.TaskFunction;

        /**
         * Register the task by the taskName.
         * @param {string} taskName - Task name.
         * @param {TaskFunction} fn - Task function.
         */
        task(taskName: string, fn: Undertaker.TaskFunction): void;

        /**
         * Register the task by the name property of the function.
         * @param {TaskFunction} fn - Task function.
         */
        task(fn: Undertaker.TaskFunction): void;


        task(taskName: string, deps: string[], fn: Undertaker.TaskFunction): void;

        task(taskName: string, deps: string[]): void;
    }
}
