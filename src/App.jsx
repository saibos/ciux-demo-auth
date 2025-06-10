import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import AuthTabs from './auth/AuthTabs';
import './App.css';

// Firebase konfiguracija - ovo je demo, pravi projekt koristi zaseban key
const firebaseConfig = {
  apiKey: "AIzaSyB5QFlE5hyvY3MvQGn7haVzTCFQ9m-bdUQ",
  authDomain: "ciux-demo-auth.firebaseapp.com",
  projectId: "ciux-demo-auth",
  storageBucket: "ciux-demo-auth.firebasestorage.app",
  messagingSenderId: "1047690973153",
  appId: "1:1047690973153:web:741cd73d8a439ea10f4ca0"
};

// Inicijalizacija Firebase aplikacije
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Glavna komponenta aplikacije
function App() {
  return (
    <div style={{ padding: 20 }}>
      <AuthTabs />
    </div>
  );
}

export default App;
