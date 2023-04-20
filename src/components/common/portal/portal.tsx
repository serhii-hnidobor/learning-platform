import { createPortal } from 'react-dom';

interface PortalProps {
  children: JSX.Element;
  container: Element | DocumentFragment;
}

const Portal = ({ container, children }: PortalProps) => {
  return createPortal(children, container);
};

export default Portal;
