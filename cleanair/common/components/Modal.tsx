import { ReactNode } from 'react';
import { Modal as PaperModal } from 'react-native-paper';
import { makeVar, useReactiveVar } from '@apollo/client';

const modalContent = makeVar<ReactNode | null>(null);

const hideModal = () => modalContent(null);
const showModal = (content : ReactNode) => modalContent(content);

const Modal = () => {
  const content = useReactiveVar(modalContent);

  return (
    <PaperModal visible={content != null} onDismiss={() => modalContent(null)} >
        {content}
    </ PaperModal>
  );
}
export { Modal, hideModal, showModal };