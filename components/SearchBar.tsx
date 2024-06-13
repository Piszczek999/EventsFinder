import Icon from "./Icon";
import SearchInput from "./SearchInput";

type Props = {
  onSubmit: (searchText: string) => void;
};

export default function SearchBar({ onSubmit }: Props) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit(formData.get("text") as string);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center max-w-[400px] overflow-hidden rounded"
    >
      <SearchInput
        name="text"
        className="text-xl p-2 w-full outline-none"
        autoComplete="off"
        placeholder="Szukaj..."
      />
      <button type="submit" className="min-h-11 min-w-11 p-1 bg-[#333333]">
        <Icon icon="search" />
      </button>
    </form>
  );
}
