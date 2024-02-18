import { ReactNode } from 'react';
import { Modal as GSModal} from "@gluestack-ui/themed"
import { makeVar, useReactiveVar } from '@apollo/client';

const modalContent = makeVar<ReactNode | null>(null);

const hideModal = () => modalContent(null);
const showModal = (content : ReactNode) => modalContent(content);

const Modal = () => {
  const content = useReactiveVar(modalContent);

  return (
    <GSModal isOpen={content != null} onClose={() => modalContent(null)} >
        {content}
    </ GSModal>
  );
}
export { Modal, hideModal, showModal };