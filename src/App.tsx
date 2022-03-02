import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostComponent from './components/post.component';
import { EnumTipoServico } from './enums';
import { Article } from './models/Post';
import { useLocalStorage } from 'usehooks-ts';
import { Nav, Navbar } from 'react-bootstrap';

const App: React.FC = () => {
    useLocalStorage<Article>('Articulo', new Article())
    return (<>
        <header>
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand className='blog-header-logo text-white text-center'>Andrew Posts</Navbar.Brand>
                
                <Nav.Item className='text-white' >Page made by: Andrés Suárez</Nav.Item>
                <Nav.Link href="https://github.com/andress18/codechallenge-blogs-client">GitHub Repo</Nav.Link>
            </Navbar>
        </header>
        <div className="">
            <PostComponent tipoServicio={EnumTipoServico.Local} />
            <PostComponent tipoServicio={EnumTipoServico.Remote} />
            <PostComponent tipoServicio={EnumTipoServico.RemotePlus} /> 
        </div>
    </>);
}

export default App;
