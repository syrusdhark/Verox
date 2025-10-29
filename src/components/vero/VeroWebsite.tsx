import { useState } from 'react';
import { VeroHomePage } from './VeroHomePage';
import { VeroAbout } from './VeroAbout';
import { VeroInvestment } from './VeroInvestment';
import { VeroContact } from './VeroContact';
import { VeroStories } from './VeroStories';
import { VeroNav } from './VeroNav';
import { motion, AnimatePresence } from 'motion/react';

type Page = 'home' | 'about' | 'investment' | 'contact' | 'stories';

export function VeroWebsite() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <VeroHomePage />;
      case 'about':
        return <VeroAbout />;
      case 'investment':
        return <VeroInvestment />;
      case 'contact':
        return <VeroContact />;
      case 'stories':
        return <VeroStories />;
      default:
        return <VeroHomePage />;
    }
  };

  return (
    <div className="vero-website bg-background text-foreground min-h-screen">
      <VeroNav currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
