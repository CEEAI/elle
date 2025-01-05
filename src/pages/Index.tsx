import { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import FilterSection from '@/components/FilterSection';
import QuestionCard from '@/components/QuestionCard';
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
        <div className="bg-white/70 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8">
          <Input
            placeholder="搜索问题..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full mb-6"
          />
          
          <div className="grid gap-6 md:grid-cols-3">
            <FilterSection
              title="难度筛选"
              options={difficulties}
              selected={selectedDifficulties}
              onToggle={handleDifficultyToggle}
            />
            <FilterSection
              title="类型筛选"
              options={types}
              selected={selectedTypes}
              onToggle={handleTypeToggle}
            />
            <FilterSection
              title="领域筛选"
              options={domains}
              selected={selectedDomains}
              onToggle={handleDomainToggle}
            />
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
            <QuestionCard key={question.序号} {...question} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;