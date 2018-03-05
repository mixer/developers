import { h } from 'preact';
import { PreactControl, Translate } from './alchemy/preact';

class MyButton extends PreactControl {
    render() {
        return <button><Translate string="clickMe" /></button>
    }
}
