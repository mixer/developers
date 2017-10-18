@Mixer.Control({ kind: 'helloWorld' })
export class HelloWorldControl extends PreactControl {
    @Mixer.Input() public dimensions: Mixer.IDimensions;
    @Mixer.Input() public text: string;
    @Mixer.Input({ kind: Mixer.InputKind.Color }) public color: string;

    render() {
        return <div style={this.props.style.compile()}>
            <h1 style={`color:${this.color}`}>{this.text}</h1>
        </div>;
    }
}
