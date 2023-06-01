import { Outlet } from "react-router-dom";
import styled from 'styled-components';
import { Navbar } from "./Navbar";

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto;
  height: 100vh;
`;

const LeftNavbar = styled(Navbar)`
  grid-column: 1;
  grid-row: 1;
`;

const Content = styled.div`
  grid-column: 2;
  grid-row: 1;
`;

export function Layout(){
    return (
        <Container>
            <LeftNavbar/>
            <Content>
                <Outlet/>
            </Content>
        </Container>
    )
}