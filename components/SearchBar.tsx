import Icon from "./Icon";

export default function SearchBar({
  onSubmit,
}: {
  onSubmit: (searchText: string) => void;
}) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit(formData.get("text") as string);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-[400px] rounded-full bg-[#F5EFE6]"
    >
      <input
        type="text"
        name="text"
        className="flex-1 rounded-full bg-transparent text-xl p-2 w-full outline-none"
        autoComplete="off"
        placeholder="Search..."
      />
      <button type="submit" className="h-11 w-11 p-1 bg-[#1A4D2E] rounded-full">
        <Icon icon="search" />
      </button>
    </form>
  );
}
