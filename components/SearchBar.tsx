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
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="p-1"
        >
          <path
            d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
            stroke="#F5EFE6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </form>
  );
}
