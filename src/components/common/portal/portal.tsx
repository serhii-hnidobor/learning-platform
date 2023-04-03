import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  container: Element | DocumentFragment;
}

const Portal = ({ container, children }: PortalProps) => {
  return createPortal(children, container);
};

export default Portal;
