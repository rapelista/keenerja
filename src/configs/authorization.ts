export const authorization = {
  mustPublic: ['/sign-in', '/sign-up', '/forgot-password'],

  mustPrivate: ['/dashboard'],

  paths: {
    signIn: '/sign-in',

    signUp: '/sign-up',

    signOut: '/sign-out',

    dashboard: '/dashboard',
  },
};
