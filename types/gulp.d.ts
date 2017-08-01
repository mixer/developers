import 'gulp';
declare module 'gulp' {
    interface WatchMethod {
        (globs: Globs, tasks: string[]): fs.FSWatcher;
    }
}
