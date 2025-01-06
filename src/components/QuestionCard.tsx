import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LatexRenderer from "./LatexRenderer";
import { useLanguage } from "@/contexts/LanguageContext";

interface QuestionCardProps {
  序号: number;
  问题: string;
  难度: string;
  类型: string | string[];
  领域: string | string[];
  searchQuery?: string;
}

const QuestionCard = ({ 序号, 问题, 难度, 类型, 领域, searchQuery }: QuestionCardProps) => {
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
    return language === 'zh' ? `问题 ${序号}` : `Question ${序号}`;
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-200 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          <span>{getQuestionTitle()}</span>
          <div className="flex gap-2">
            <Badge variant={getDifficultyColor(难度)}>{难度}</Badge>
            {Array.isArray(类型) ? 
              类型.map(type => (
                <Badge key={type} variant="outline">{type}</Badge>
              )) : 
              <Badge variant="outline">{类型}</Badge>
            }
            {Array.isArray(领域) ? 
              领域.map(domain => (
                <Badge key={domain} variant="secondary">{domain}</Badge>
              )) : 
              <Badge variant="secondary">{领域}</Badge>
            }
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-gray-700">
          <LatexRenderer content={问题} searchQuery={searchQuery} />
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;