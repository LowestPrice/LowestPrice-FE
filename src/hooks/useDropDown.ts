import { useEffect, useState, RefObject, Dispatch, SetStateAction } from 'react';

const useDropDown = (elem: RefObject<HTMLElement>, initialState: boolean): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (elem.current instanceof HTMLElement && !elem.current.contains(e.target as Node)) {
        setIsOpen((prevIsOpen) => !prevIsOpen);
      }
    };

    if (isOpen) {
      window.addEventListener('click', onClick);
    }

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [isOpen, elem]);

  return [isOpen, setIsOpen];
};

export default useDropDown;
