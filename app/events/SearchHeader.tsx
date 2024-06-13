import SearchBar from "../../components/SearchBar";
import Icon from "../../components/Icon";
import Link from "next/link";

type Props = {
  onSearch: (searchText: string) => void;
  onFilterClick: () => void;
};

export default function SearchHeader({ onSearch, onFilterClick }: Props) {
  return (
    <div className="tile flex flex-col items-center p-2 shadow">
      <h1 className="text-4xl text-white font-bold p-2">Wyszukiwarka</h1>
      <div className="flex justify-center p-2 gap-4 items-center">
        <SearchBar onSubmit={onSearch} />
        <button
          className="bg-[#333333] items-center rounded p-2 min-w-11 min-h-11"
          onClick={onFilterClick}
        >
          <Icon icon="filter" />
        </button>
        <Link
          href={"/new-event"}
          className="bg-[#333333] items-center rounded p-2 min-w-11 min-h-11"
        >
          <Icon icon="plus" />
        </Link>
      </div>
    </div>
  );
}
