@Mixer.Control({ kind: 'helloWorld' })
export class HelloWorldControl extends PreactControl {
    @Mixer.Input() public dimensions: Mixer.IDimensions;
    @Mixer.Input() public text: string;
    @Mixer.Input() public awesome: boolean;

    render() {
        return <div
            style={this.props.style.compile()}
            class={classes({ isAwesome: this.awesome })}
        >
            <h1>{this.text}</h1>
        </div>;
    }
}
