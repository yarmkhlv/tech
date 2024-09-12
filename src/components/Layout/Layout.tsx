import { Container } from '../Container';
import { Header } from '../Header';

interface ILayoutProps {
    children: React.ReactNode;
}

export const Layout = ({ children }: ILayoutProps) => {
    return (
        <Container>
            <Header />
            {children}
        </Container>
    );
};
