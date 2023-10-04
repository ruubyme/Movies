interface TabProps {
  name: string;
  selectedTab: string;
  onSelect: () => void;
  children: React.ReactNode;
}

const Tab: React.FC<TabProps> = ({ name, selectedTab, onSelect, children }) => {
  const isActive = name === selectedTab;

  return (
    <button
      className={`
      px-4 py-2 
      bg-gray-500 text-gray-600 
      ${isActive ? "bg-gray-500 bg-opacity-25 text-white" : ""}
      rounded-t 
      border-b-0 
      border-l border-r border-t 
      border-gray-600 
    `}
      onClick={onSelect}
    >
      {children}
    </button>
  );
};

export default Tab;
