import { MainContainer } from '../Containers/MainContainer';
import { Header } from '../shared/Header';

interface ILayoutProps {
    children: React.ReactNode;
}

export const Layout = ({ children }: ILayoutProps) => {
    return (
        <MainContainer>
            <Header />
            {children}
        </MainContainer>
    );
};
