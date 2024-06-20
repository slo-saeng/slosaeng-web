import classNames from 'classnames';

interface Item {
  id: string;
  text: string;
}

interface SidebarProps {
  sort: string;
  detail: string;
  handleTable: (role: string) => void;
  items: Item[];
}

const Sidebar = ({ sort, detail, handleTable, items }: SidebarProps) => {
  return (
    <div className="flex flex-col w-1/6 h-screen py-20 pl-6 text-left bg-main-point">
      <h1 className="mb-6 text-3xl font-bold">{sort} Page</h1>
      <div className="flex flex-col space-y-2">
        {items.map(({ id, text }) => (
          <button
            type="button"
            key={id}
            onClick={() => handleTable(id)}
            className={classNames('text-left hover:font-bold hover:text-lg', {
              'font-bold text-lg': detail === id,
            })}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
