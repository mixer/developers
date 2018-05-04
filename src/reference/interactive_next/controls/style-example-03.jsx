@Mixer.Control({ kind: 'helloWorld' })
export class HelloWorldControl extends PreactControl {
    @Mixer.Input() public dimensions: Mixer.IDimensions;
    @Mixer.Input() public text: string;
    @Mixer.Input({ kind: Mixer.InputKind.Color }) public color: string;

    render() {
        const style = this.props.style.concat({ color: this.color });
        return <div style={style.compile()}><h1>{this.text}</h1></div>;
    }
}
