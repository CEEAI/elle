import { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import questions from '../data/questions.json';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

  // 获取所有唯一的难度、类型和领域值
  const difficulties = [...new Set(questions.map(q => q.难度))];
  const types = [...new Set(questions.flatMap(q => Array.isArray(q.类型) ? q.类型 : [q.类型]))];
  const domains = [...new Set(questions.flatMap(q => Array.isArray(q.领域) ? q.领域 : [q.领域]))];

  // 过滤问题
  const filteredQuestions = useMemo(() => {
    return questions.filter(question => {
      const matchesSearch = Object.values(question).some(value => 
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      const matchesDifficulty = selectedDifficulties.length === 0 || 
        selectedDifficulties.includes(question.难度);
      
      const matchesType = selectedTypes.length === 0 || 
        (Array.isArray(question.类型) ? 
          question.类型.some(t => selectedTypes.includes(t)) : 
          selectedTypes.includes(question.类型));
      
      const matchesDomain = selectedDomains.length === 0 || 
        (Array.isArray(question.领域) ? 
          question.领域.some(d => selectedDomains.includes(d)) : 
          selectedDomains.includes(question.领域));

      return matchesSearch && matchesDifficulty && matchesType && matchesDomain;
    });
  }, [searchQuery, selectedDifficulties, selectedTypes, selectedDomains]);

  const handleDifficultyToggle = (difficulty: string) => {
    setSelectedDifficulties(prev => 
      prev.includes(difficulty) 
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleDomainToggle = (domain: string) => {
    setSelectedDomains(prev => 
      prev.includes(domain) 
        ? prev.filter(d => d !== domain)
        : [...prev, domain]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          环境问题检索系统
        </h1>
        
        {/* 搜索和筛选区域 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <Input
            placeholder="搜索问题..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full mb-6"
          />
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* 难度筛选 */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">难度筛选</h3>
              <div className="flex flex-wrap gap-2">
                {difficulties.map(difficulty => (
                  <label key={difficulty} className="flex items-center space-x-2 bg-gray-50 p-2 rounded-md">
                    <Checkbox
                      checked={selectedDifficulties.includes(difficulty)}
                      onCheckedChange={() => handleDifficultyToggle(difficulty)}
                    />
                    <span>{difficulty}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 类型筛选 */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">类型筛选</h3>
              <div className="flex flex-wrap gap-2">
                {types.map(type => (
                  <label key={type} className="flex items-center space-x-2 bg-gray-50 p-2 rounded-md">
                    <Checkbox
                      checked={selectedTypes.includes(type)}
                      onCheckedChange={() => handleTypeToggle(type)}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 领域筛选 */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">领域筛选</h3>
              <div className="flex flex-wrap gap-2">
                {domains.map(domain => (
                  <label key={domain} className="flex items-center space-x-2 bg-gray-50 p-2 rounded-md">
                    <Checkbox
                      checked={selectedDomains.includes(domain)}
                      onCheckedChange={() => handleDomainToggle(domain)}
                    />
                    <span>{domain}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 已选筛选条件展示 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedDifficulties.map(difficulty => (
            <Badge 
              key={difficulty} 
              variant="secondary"
              className="cursor-pointer"
              onClick={() => handleDifficultyToggle(difficulty)}
            >
              难度: {difficulty} ×
            </Badge>
          ))}
          {selectedTypes.map(type => (
            <Badge 
              key={type} 
              variant="secondary"
              className="cursor-pointer"
              onClick={() => handleTypeToggle(type)}
            >
              类型: {type} ×
            </Badge>
          ))}
          {selectedDomains.map(domain => (
            <Badge 
              key={domain} 
              variant="secondary"
              className="cursor-pointer"
              onClick={() => handleDomainToggle(domain)}
            >
              领域: {domain} ×
            </Badge>
          ))}
        </div>

        {/* 结果计数 */}
        <p className="text-gray-600 mb-4">
          共找到 {filteredQuestions.length} 个问题
        </p>

        {/* 问题列表 */}
        <div className="grid gap-4">
          {filteredQuestions.map((question) => (
            <Card key={question.序号} className="w-full hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>问题 {question.序号}</span>
                  <div className="flex gap-2">
                    <Badge variant={question.难度 === '困难' ? 'destructive' : 
                              question.难度 === '中等' ? 'default' : 
                              'secondary'}>
                      {question.难度}
                    </Badge>
                    {Array.isArray(question.类型) ? 
                      question.类型.map(type => (
                        <Badge key={type} variant="outline">{type}</Badge>
                      )) : 
                      <Badge variant="outline">{question.类型}</Badge>
                    }
                    {Array.isArray(question.领域) ? 
                      question.领域.map(domain => (
                        <Badge key={domain} variant="secondary">{domain}</Badge>
                      )) : 
                      <Badge variant="secondary">{question.领域}</Badge>
                    }
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-gray-700">{question.问题}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;