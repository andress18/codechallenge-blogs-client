import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostComponent from './components/post.component';
import { EnumTipoServico } from './enums';
import { Article } from './models/Post';
import { useLocalStorage } from 'usehooks-ts';
import { Navbar } from 'react-bootstrap';

const App: React.FC = () => {
    useLocalStorage<Article>('Articulo', new Article())
    return (<>
        <header>
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand className='blog-header-logo text-white text-center'>Andrew Posts</Navbar.Brand>
            </Navbar>
        </header>
        <div className="">
            <PostComponent tipoServicio={EnumTipoServico.Local} />
            <PostComponent tipoServicio={EnumTipoServico.Remote} />
            <PostComponent tipoServicio={EnumTipoServico.RemotePlus} /> 
        </div>
        <footer className="text-center">
            <p>Posts page made by: Andrés Suárez.</p>
            <p>
                <a href="https://github.com">Go to source code</a>
            </p>
        </footer>
    </>);
}

export default App;
