import { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import questions from '../data/questions.json';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('全部');
  const [typeFilter, setTypeFilter] = useState('全部');
  const [domainFilter, setDomainFilter] = useState('全部');

  // 获取所有唯一的难度、类型和领域值
  const difficulties = ['全部', ...new Set(questions.map(q => q.难度))];
  const types = ['全部', ...new Set(questions.flatMap(q => Array.isArray(q.类型) ? q.类型 : [q.类型]))];
  const domains = ['全部', ...new Set(questions.flatMap(q => Array.isArray(q.领域) ? q.领域 : [q.领域]))];

  // 过滤问题
  const filteredQuestions = useMemo(() => {
    return questions.filter(question => {
      const matchesSearch = Object.values(question).some(value => 
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      const matchesDifficulty = difficultyFilter === '全部' || question.难度 === difficultyFilter;
      
      const matchesType = typeFilter === '全部' || 
        (Array.isArray(question.类型) ? 
          question.类型.includes(typeFilter) : 
          question.类型 === typeFilter);
      
      const matchesDomain = domainFilter === '全部' || 
        (Array.isArray(question.领域) ? 
          question.领域.includes(domainFilter) : 
          question.领域 === domainFilter);

      return matchesSearch && matchesDifficulty && matchesType && matchesDomain;
    });
  }, [searchQuery, difficultyFilter, typeFilter, domainFilter]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">环境问题检索系统</h1>
      
      {/* 搜索和筛选区域 */}
      <div className="grid gap-4 mb-8 md:grid-cols-4">
        <Input
          placeholder="搜索问题..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
        
        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <SelectTrigger>
            <SelectValue placeholder="选择难度" />
          </SelectTrigger>
          <SelectContent>
            {difficulties.map(difficulty => (
              <SelectItem key={difficulty} value={difficulty}>
                {difficulty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="选择类型" />
          </SelectTrigger>
          <SelectContent>
            {types.map(type => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={domainFilter} onValueChange={setDomainFilter}>
          <SelectTrigger>
            <SelectValue placeholder="选择领域" />
          </SelectTrigger>
          <SelectContent>
            {domains.map(domain => (
              <SelectItem key={domain} value={domain}>
                {domain}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 结果计数 */}
      <p className="text-gray-600 mb-4">
        共找到 {filteredQuestions.length} 个问题
      </p>

      {/* 问题列表 */}
      <div className="grid gap-4">
        {filteredQuestions.map((question) => (
          <Card key={question.序号} className="w-full">
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
              <p className="whitespace-pre-wrap">{question.问题}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;