import { HelloWorldControl } from './HelloWorld';
import { LeaderboardScene } from './LeaderboardScene';

// ...

const registry = new Mixer.Registry().register(
    Button, Joystick, HelloWorldControl, PreactScene, LeaderboardScene);

// ...
