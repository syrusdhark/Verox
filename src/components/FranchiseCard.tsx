import { Franchise } from "../lib/mock-data";
import { TrendingUp, DollarSign, Award } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

interface FranchiseCardProps {
  franchise: Franchise;
  onClick: () => void;
}

export function FranchiseCard({ franchise, onClick }: FranchiseCardProps) {
  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return 'text-foreground';
    if (score >= 60) return 'text-muted-foreground';
    return 'text-foreground/70';
  };

  const getMatchScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-foreground/10';
    if (score >= 60) return 'bg-muted';
    return 'bg-muted/50';
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-foreground/20 transition-all cursor-pointer" onClick={onClick}>
      {/* Logo/Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{franchise.logo}</div>
            <div>
              <h3 className="text-foreground">{franchise.name}</h3>
              <p className="text-sm text-muted-foreground">{franchise.tagline}</p>
            </div>
          </div>
          <div className={`${getMatchScoreBgColor(franchise.matchScore)} px-3 py-1 rounded-full`}>
            <span className={`text-sm ${getMatchScoreColor(franchise.matchScore)}`}>
              {franchise.matchScore}% Match
            </span>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">Investment:</span>
          <span className="text-foreground">
            ${(franchise.investmentMin / 1000).toFixed(0)}k - ${(franchise.investmentMax / 1000).toFixed(0)}k
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">ROI:</span>
          <span className="text-foreground">{franchise.roi}%</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Award className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">Success Rate:</span>
          <span className="text-foreground">{franchise.successRate}%</span>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Match Score</span>
            <span className={getMatchScoreColor(franchise.matchScore)}>{franchise.matchScore}%</span>
          </div>
          <Progress value={franchise.matchScore} className="h-2" />
        </div>

        <Button className="w-full bg-foreground hover:bg-foreground/90 text-background" onClick={onClick}>
          View Details
        </Button>
      </div>
    </div>
  );
}
