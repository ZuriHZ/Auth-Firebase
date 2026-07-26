import type { CloudFunction } from "../types";
import { FunctionCard } from "./FunctionCard";

interface FunctionsListProps {
  functions: CloudFunction[];
}

export const FunctionsList: React.FC<FunctionsListProps> = ({ functions }) => {
  return (
    <div className="space-y-4">
      {functions.map((fn, index) => (
        <FunctionCard key={fn.id} fn={fn} index={index} />
      ))}
    </div>
  );
};
