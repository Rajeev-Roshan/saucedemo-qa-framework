export const USERS = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  problem: {
    username: 'problem_user',
    password: 'secret_sauce',
  },
  performance: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
  error: {
    username: 'error_user',
    password: 'secret_sauce',
  },
  visual: {
    username: 'visual_user',
    password: 'secret_sauce',
  },
};

export const INVALID_USERS = {
  wrongPassword: {
    username: 'standard_user',
    password: 'wrong_password',
  },
  wrongUsername: {
    username: 'not_a_user',
    password: 'secret_sauce',
  },
  empty: {
    username: '',
    password: '',
  },
  emptyPassword: {
    username: 'standard_user',
    password: '',
  },
  emptyUsername: {
    username: '',
    password: 'secret_sauce',
  },
};
