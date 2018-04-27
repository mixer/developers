import * as Mixer from '@mixer/cdk-std';
import { h } from 'preact';

import { PreactControl } from './alchemy/preact';

@Mixer.Control({ kind: 'helloWorld' })
export class HelloWorldControl extends PreactControl {
    /**
     * Position of the control. This is required if you want to edit your
     * controls in the Interactive Studio!
     */
    @Mixer.Input() public dimensions: Mixer.IDimensions;

    /**
     * Text to display in the control. The "string" type can be seen an inferred,
     * and people will be able to set it in the GUI.
     */
    @Mixer.Input() public text: string;

    /**
     * Color of the text. The kind is specified manually here.
     */
    @Mixer.Input({ kind: Mixer.InputKind.Color }) public color: string;

    render() {
        return <h1 style={`color:${this.color}`}>{this.text}</h1>;
    }
}
