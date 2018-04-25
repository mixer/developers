@Mixer.Control({ kind: 'helloWorld' })
export class HelloWorldControl extends PreactControl {
    @Mixer.Input() public dimensions: Mixer.IDimensions;
    @Mixer.Input() public text: string;
    @Mixer.Input({ kind: Mixer.InputKind.Color }) public color: string;

    render() {
        return <button onMouseDown={this.fire} style={`color:${this.color}`}>
            {this.text}
        </button>;
    }

    /**
     * This function gets called when the user presses their mouse on the
     * button. @bind is needed here to preserve function context (a JavaScript
     * language quirk).
     */
    @bind
    fire() {
        const participant = this.control.state.participant;
        this.control.giveInput({
            event: 'clicked',
            username: participant.get('username'),
        });
    }
}
