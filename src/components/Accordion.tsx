import React, { useRef } from 'react';

interface AccordionProps {
  id: string;
  title?: string;
  content?: React.ReactNode;
  activeAccordion: string | null;
  setActiveAccordion: (id: string | null) => void;
}

function Accordion({
  id = "",
  title = "Accordion Title",
  content = "Accordion Content",
  activeAccordion,
  setActiveAccordion,
}: AccordionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isOpen = activeAccordion === id;

  const handleOpen = () => {
    setActiveAccordion(isOpen ? null : id);
  };
  return (
    <div
      ref={containerRef}
      className="border rounded"
    >
      <button id={id} ref={buttonRef} onClick={handleOpen} className="cursor-pointer flex justify-between w-full p-4">
        <p>{title}</p>
        <p className={`transition-all duration-200 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>&#10095;</p>
      </button>
      <div className={`transition-all duration-200 px-4  ${isOpen ? 'max-h-[1000px] overflow-auto py-4' : 'max-h-0 overflow-hidden py-0'}`}>
        {content}
      </div>
    </div>
  )
}

export default Accordion;