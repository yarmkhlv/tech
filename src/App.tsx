import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdsListPage } from './pages/AdsListPage';
import { OrdersPage } from './pages/OrdersPage';

import { Navigation } from './components/widgets/Navigation';

import styles from './app.module.scss';
import { AdDetailsPage } from './pages/AdDetailsPage';
import { Layout } from './components/Layout';
import { AdsListPageProvider } from './components/Providers/AdsListPageProvider';

export function App() {
    return (
        <Router>
            <Layout>
                <div className={styles.contentWrapper}>
                    <Navigation />
                    <main className={styles.mainContent}>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <AdsListPageProvider>
                                        <AdsListPage />
                                    </AdsListPageProvider>
                                }
                            />
                            <Route
                                path="/advertisement/:id"
                                element={<AdDetailsPage />}
                            />
                            <Route path="/orders" element={<OrdersPage />} />
                        </Routes>
                    </main>
                </div>
            </Layout>
        </Router>
    );
}
