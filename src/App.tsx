import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { ChatInterface } from "./components/ChatInterface";
import { FranchiseDetailModal } from "./components/FranchiseDetailModal";
import { Dashboard } from "./components/Dashboard";
import { LeadDetailView } from "./components/LeadDetailView";
import { Franchise, Lead } from "./lib/mock-data";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./lib/theme-context";

type View = 'landing' | 'chat' | 'dashboard' | 'lead-detail';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [selectedFranchise, setSelectedFranchise] = useState<Franchise | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const handleGetStarted = () => {
    setCurrentView('chat');
  };

  const handleGoToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleViewFranchise = (franchise: Franchise) => {
    setSelectedFranchise(franchise);
  };

  const handleCloseFranchiseModal = () => {
    setSelectedFranchise(null);
  };

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setCurrentView('lead-detail');
  };

  const handleBackFromLead = () => {
    setSelectedLead(null);
    setCurrentView('dashboard');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        {/* Main Content */}
        {currentView === 'landing' && (
          <LandingPage 
            onGetStarted={handleGetStarted} 
            onGoToDashboard={handleGoToDashboard}
          />
        )}

        {currentView === 'chat' && (
          <ChatInterface 
            onViewFranchise={handleViewFranchise}
            onGoToDashboard={handleGoToDashboard}
            onGoToHome={() => setCurrentView('landing')}
          />
        )}

        {currentView === 'dashboard' && (
          <Dashboard 
            onViewLead={handleViewLead}
            onGoToConversation={() => setCurrentView('chat')}
            onGoToHome={() => setCurrentView('landing')}
          />
        )}

        {currentView === 'lead-detail' && selectedLead && (
          <LeadDetailView lead={selectedLead} onBack={handleBackFromLead} />
        )}

        {/* Franchise Detail Modal */}
        <FranchiseDetailModal
          franchise={selectedFranchise}
          open={!!selectedFranchise}
          onClose={handleCloseFranchiseModal}
        />

        <Toaster />
      </div>
    </ThemeProvider>
  );
}
