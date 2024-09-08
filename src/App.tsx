import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdsListPage } from './pages/AdsListPage';
import { OrdersPage } from './pages/OrdersPage';

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
                    <main className={styles.mainContent}>
                        <Routes>
                            <Route path="/" element={<AdsListPage />} />
                            <Route path="/orders" element={<OrdersPage />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}
