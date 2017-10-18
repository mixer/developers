import { RuleSet, css } from './alchemy/Style';

// This outputs: `color:#fff;background-color:#000;width:500
console.log(
  new RuleSet({
    color: '#fff',
    backgroundColor: '#000',
    width: 500,
  }).compile();
);


// css() is a shortcut for that. Outputs: `color:#fff`.
console.log(css({ color: '#fff' }))
