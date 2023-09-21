import { useRouter } from "next/router";
import { useState } from "react";

interface SearchFormProps {
  keyword?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ keyword = "" }) => {
  const router = useRouter();
  const [value, setValue] = useState(keyword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) {
      router.push("/");
      return;
    }
    router.push(`/movie/search?q=${value}`);
  };
  return (
    <div className="pl-2 pb-2">
      <form onSubmit={handleSubmit}>
        <input
          name="q"
          value={value}
          placeholder="영화를 검색하세요."
          onChange={handleChange}
          className="rounded-md bg-gray-600 bg-opacity-10 border border-gray-100 px-3 h-7 text-sm text-gray-100"
        />
        <button className="px-1">🔍</button>
      </form>
    </div>
  );
};

export default SearchForm;
