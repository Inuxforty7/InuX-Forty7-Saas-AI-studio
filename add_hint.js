import fs from 'fs';

let content = fs.readFileSync('src/components/TerminalPanel.tsx', 'utf8');

// 1. Add states and ref
const stateToInject = `  const [clicksCount, setClicksCount] = useState<number>(0);
  
  // Mobile Scroll Hint State
  const [showMobileScrollHint, setShowMobileScrollHint] = useState<boolean>(true);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (modalScrollRef.current) {
        if (modalScrollRef.current.scrollTop > 30) {
          setShowMobileScrollHint(false);
        } else {
          setShowMobileScrollHint(true);
        }
      }
    };
    const el = modalScrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll, { passive: true });
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, [mobileViewMode]);

  useEffect(() => {
    setShowMobileScrollHint(true);
  }, [selectedPromptId, selectedModelId, selectedCreationId, selectedAutomationId, selectedProductivityId, mobileViewMode]);`;

content = content.replace(
  "  const [clicksCount, setClicksCount] = useState<number>(0);",
  stateToInject
);

// 2. Add the ref to the modal background
content = content.replace(
  '<div className="fixed inset-0 z-[100] bg-[#03070D] font-mono text-white flex flex-col overflow-y-auto lg:overflow-hidden selection:bg-[#FF4500] selection:text-white terminal-modal custom-scroll">',
  '<div ref={modalScrollRef} className="fixed inset-0 z-[100] bg-[#03070D] font-mono text-white flex flex-col overflow-y-auto lg:overflow-hidden selection:bg-[#FF4500] selection:text-white terminal-modal custom-scroll relative">'
);

// 3. Add the UI overlay for mobile scroll hint at the bottom of the TerminalPanel
const scrollHintUI = `      </style>

      {/* MOBILE SCROLL HINT OVERLAY */}
      <AnimatePresence>
        {showMobileScrollHint && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] pointer-events-none flex flex-col items-center justify-center gap-1.5 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
          >
            <div className="bg-[#FF4500]/90 text-white font-mono text-[9px] font-bold tracking-widest px-3 py-1.5 rounded-full border border-white/20 uppercase flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,69,0,0.5)]">
               <span>ARRASTE PARA ROLAR</span>
               <ArrowDown size={10} className="animate-bounce" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Holographic Overlays */}`;

content = content.replace(
  `      </style>

      {/* Holographic Overlays */}`,
  scrollHintUI
);

// Also we need to import ArrowDown if it's not imported.
content = content.replace(
  "ArrowRight, \n  Settings,",
  "ArrowRight, \n  ArrowDown, \n  Settings,"
);

fs.writeFileSync('src/components/TerminalPanel.tsx', content);
