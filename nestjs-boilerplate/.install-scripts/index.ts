import prompts from 'prompts';
import removeFacebookAuth from './scripts/remove-auth-facebook';
import removeGoogleAuth from './scripts/remove-auth-google';
import removeAppleAuth from './scripts/remove-auth-apple';
import removeTwitterAuth from './scripts/remove-auth-twitter';
import removeInstallScripts from './scripts/remove-install-scripts';
import removeMongoDb from './scripts/remove-mongodb';
import removeDocumentResourceGeneration from './scripts/resource-generation-scripts/remove-document';
import removeAllDbResourceGeneration from './scripts/resource-generation-scripts/remove-all-db';

(async () => {
  const response = await prompts(
    [
      {
        type: 'select',
        name: 'database',
        message: 'Which database do you want to use?',
        choices: [{ title: 'PostgreSQL', value: 'pg' }],
      },
      {
        type: 'confirm',
        name: 'isAuthFacebook',
        message: 'Include Facebook auth?',
        initial: true,
      },
      {
        type: 'confirm',
        name: 'isAuthGoogle',
        message: 'Include Google auth?',
        initial: true,
      },
      {
        type: 'confirm',
        name: 'isAuthTwitter',
        message: 'Include Twitter auth?',
        initial: true,
      },
      {
        type: 'confirm',
        name: 'isAuthApple',
        message: 'Include Apple auth?',
        initial: true,
      },
    ],
    {
      onCancel() {
        process.exit(1);
      },
    },
  );

  if (response.database === 'pg') {
    removeMongoDb();
    removeDocumentResourceGeneration();
    removeAllDbResourceGeneration();
  }

  if (!response.isAuthFacebook) {
    removeFacebookAuth();
  }

  if (!response.isAuthGoogle) {
    removeGoogleAuth();
  }

  if (!response.isAuthTwitter) {
    removeTwitterAuth();
  }

  if (!response.isAuthApple) {
    removeAppleAuth();
  }

  removeInstallScripts();
  process.exit(0);
})();
