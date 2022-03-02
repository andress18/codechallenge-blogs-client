import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import ArticuloForm from './articuloForm';
import CSS from 'csstype';
import '../../fonts.css'

interface Props {
    titulo: string;
    onSave: () => void;
    onHide: () => void,
    show: boolean;
}

const ModalArticulo: React.FunctionComponent<Props> = (props) => {
    const titleStyle: CSS.Properties = {
        fontFamily: 'DM Serif Display, serif',
        fontSize: '20px'
    };
    return (
        <Modal size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show} >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.titulo}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ArticuloForm onSave={() => { props.onSave(); props.onHide() }} textBtnSave={props.titulo} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' style={titleStyle} onClick={() => props.onHide()}>Cancelar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalArticulo