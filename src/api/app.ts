import { getFirebaseConfig } from './helpers/get-firebase-config/get-firebase-config';
import { initializeApp } from 'firebase/app';

const firebaseConfig = getFirebaseConfig();

const app = initializeApp(firebaseConfig);

export default app;
