import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

interface LatexRendererProps {
  content: string;
}

const LatexRenderer = ({ content }: LatexRendererProps) => {
  // 分割文本，保留LaTeX部分
  const parts = content.split(/(\\begin\{align\*\}.*?\\end\{align\*\}|\\\(.*?\\\)|\\\[.*?\\\])/s);
  
  return (
    <span>
      {parts.map((part, index) => {
        if (part.startsWith('\\begin{align*}')) {
          // 处理align*环境
          const mathContent = part
            .replace('\\begin{align*}', '')
            .replace('\\end{align*}', '')
            .trim();
          return <BlockMath key={index} math={mathContent} />;
        } else if (part.startsWith('\\(') && part.endsWith('\\)')) {
          // 处理行内数学公式
          const mathContent = part.slice(2, -2);
          return <InlineMath key={index} math={mathContent} />;
        } else if (part.startsWith('\\[') && part.endsWith('\\]')) {
          // 处理行间数学公式
          const mathContent = part.slice(2, -2);
          return <BlockMath key={index} math={mathContent} />;
        }
        // 普通文本
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};

export default LatexRenderer;