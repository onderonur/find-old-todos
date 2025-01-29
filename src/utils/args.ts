import arg from 'arg';

const parsedArgs = arg({
  '--days': Number,
});

let days = parsedArgs['--days'];

if (days === undefined) {
  days = 30;
} else if (days < 0) {
  days = 0;
}

export const args = {
  days,
};
