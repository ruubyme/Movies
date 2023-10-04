const RATINGS = [1, 2, 3, 4, 5];

interface StartProps {
  selected: boolean;
  rating: number;
  onSelect?: (rating: number) => void;
}

interface RatingProps {
  value: number;
  onSelect?: (rating: number) => void;
}

const Star: React.FC<StartProps> = ({
  selected = false,
  rating = 0,
  onSelect,
}) => {
  const className = `${selected ? "text-blue-500" : "text-white"} ${
    onSelect ? "cursor-pointer" : ""
  }`;
  const handleClick = onSelect
    ? (e: React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        onSelect(rating);
      }
    : undefined;

  return (
    <span className={className} onClick={handleClick}>
      ★
    </span>
  );
};

const Rating: React.FC<RatingProps> = ({ value = 0, onSelect }) => {
  return (
    <div>
      {RATINGS.map((rating) => (
        <Star
          key={rating}
          selected={value >= rating}
          rating={rating}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default Rating;