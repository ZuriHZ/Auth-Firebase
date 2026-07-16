import { FunctionsHeader } from "./components/FunctionsHeader";
import { FunctionsList } from "./components/FunctionsList";
import { mockFunctions } from "./data/mock";

export const FunctionsPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-8rem)]">
      <FunctionsHeader />
      <FunctionsList functions={mockFunctions} />
    </div>
  );
};
