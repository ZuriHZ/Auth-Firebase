import { ShinyButton } from "../components/ui/shiny-button";
import { House } from "lucide-react";
export function ShinyButtonDemo() {
    return (
        <a href="/" rel="noopener noreferrer">
            <ShinyButton className="md:hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"><House /></ShinyButton>
        </a>
    );
}
