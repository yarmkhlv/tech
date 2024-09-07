import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdsList } from './pages/AdsList';
import { Orders } from './pages/Orders';

import { Header } from './components/Header';
import { Navigation } from './components/Navigation';

import styles from './app.module.scss';

export function App() {
    return (
        <Router>
            <div className={styles.container}>
                <Header />
                <div className={styles.contentWrapper}>
                    <Navigation />
                    <main>
                        <Routes>
                            <Route path="/" element={<AdsList />} />
                            <Route path="/orders" element={<Orders />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}
