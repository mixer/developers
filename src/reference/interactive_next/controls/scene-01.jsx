import * as Mixer from '@mcph/miix-std';
import { h } from 'preact';

import { PreactScene, Translate } from './alchemy/preact';

@Mixer.Scene({ name: 'leaderboard' })
export class LeaderboardScene extends PreactScene {
    render() {
        return <div>
            <h1><Translate string="And the winners are..." /></h1>
            {super.render()} // calls the PreactScene's render method
        </div>;
    }
}
