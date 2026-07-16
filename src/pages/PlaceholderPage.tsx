export const PlaceholderPage = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🚧</span>
        </div>
        <h1 className="text-headline-lg font-display-lg text-on-surface mb-2">
          {title}
        </h1>
        <p className="text-body-lg text-on-surface-variant">
          Próximamente
        </p>
      </div>
    </div>
  );
};
