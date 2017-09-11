import * as Mixer from '@mcph/miix-std';
import { h } from 'preact';

import { PreactControl } from './alchemy/preact';

@Mixer.Control({ kind: 'helloWorld' })
export class HelloWorldControl extends PreactControl {
    render() {
        return <h1>Hello world!</h1>;
    }
}
