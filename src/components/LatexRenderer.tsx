import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import HighlightText from './HighlightText';

interface LatexRendererProps {
  content: string;
  searchQuery?: string;
}

const LatexRenderer = ({ content, searchQuery = '' }: LatexRendererProps) => {
  const parts = content.split(/(\\begin\{align\*\}.*?\\end\{align\*\}|\\\(.*?\\\)|\\\[.*?\\\])/s);
  
  return (
    <span>
      {parts.map((part, index) => {
        if (part.startsWith('\\begin{align*}')) {
          const mathContent = part
            .replace('\\begin{align*}', '')
            .replace('\\end{align*}', '')
            .trim();
          return <BlockMath key={index} math={mathContent} />;
        } else if (part.startsWith('\\(') && part.endsWith('\\)')) {
          const mathContent = part.slice(2, -2);
          return <InlineMath key={index} math={mathContent} />;
        } else if (part.startsWith('\\[') && part.endsWith('\\]')) {
          const mathContent = part.slice(2, -2);
          return <BlockMath key={index} math={mathContent} />;
        }
        return <HighlightText key={index} text={part} highlight={searchQuery} />;
      })}
    </span>
  );
};

export default LatexRenderer;