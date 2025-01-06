import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LatexRenderer from "./LatexRenderer";
import { useLanguage } from "@/contexts/LanguageContext";

interface QuestionCardProps {
  Number: number;
  Question: string;
  Difficulty: string;
  Type: string | string[];
  Domain: string | string[];
  searchQuery?: string;
}

const QuestionCard = ({ Number, Question, Difficulty, Type, Domain, searchQuery }: QuestionCardProps) => {
  const { language } = useLanguage();
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "困难":
      case "Hard":
        return "destructive";
      case "中等":
      case "Medium":
        return "default";
      default:
        return "secondary";
    }
  };

  const getQuestionTitle = () => {
    return language === 'zh' ? `问题 ${Number}` : `Question ${Number}`;
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-200 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          <span>{getQuestionTitle()}</span>
          <div className="flex gap-2">
            <Badge variant={getDifficultyColor(Difficulty)}>{Difficulty}</Badge>
            {Array.isArray(Type) ? 
              Type.map(type => (
                <Badge key={type} variant="outline">{type}</Badge>
              )) : 
              <Badge variant="outline">{Type}</Badge>
            }
            {Array.isArray(Domain) ? 
              Domain.map(domain => (
                <Badge key={domain} variant="secondary">{domain}</Badge>
              )) : 
              <Badge variant="secondary">{Domain}</Badge>
            }
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-gray-700">
          <LatexRenderer content={Question} searchQuery={searchQuery} />
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;