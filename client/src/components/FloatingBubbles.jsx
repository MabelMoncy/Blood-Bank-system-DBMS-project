const FloatingBubbles = () => {
  const bubbles = Array.from({ length: 16 });
  return (
    <div className="bubble-field" aria-hidden>
      {bubbles.map((_, index) => (
        <span key={index} style={{ '--offset': index * 90, animationDelay: `${index * 250}ms` }} />
      ))}
    </div>
  );
};

export default FloatingBubbles;
