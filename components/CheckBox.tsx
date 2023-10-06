import { Genres } from "@/pages";

interface CheckBoxProps {
  items: Genres[];
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ items, name, handleChange }) => {
  return (
    <div>
      {items.map((item) => (
        <label key={item.id}>
          <input
            type="checkbox"
            name={name}
            value={item.id}
            onChange={handleChange}
          />
          <span className="text-white text-xs">{item.name}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckBox;
