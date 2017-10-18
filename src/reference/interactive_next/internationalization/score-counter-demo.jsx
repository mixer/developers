import { Component, h } from 'preact';
import { Translate } from './alchemy/preact';

class ScoreBoard extends Component {

    // ...

    render() {
        return <div class="score-board">
            <Translate string="displayScore" count={this.score} />
        </div>;
    }

    // ...

}
