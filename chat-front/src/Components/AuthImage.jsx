const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary to-secondary p-12">
      <div className="max-w-md text-center text-white">
        {/* Decorative Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-xl shadow-md transition-all duration-300 ${
                i % 2 === 0
                  ? "bg-white/20 animate-pulse"
                  : "bg-white/10 hover:scale-105"
              }`}
            />
          ))}
        </div>

        {/* Title & Subtitle */}
        <h2 className="text-3xl font-extrabold tracking-wide mb-3 drop-shadow-lg">
          {title}
        </h2>
        <p className="text-white/80 text-lg leading-relaxed drop-shadow-sm">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
