export interface CardDatatype {
    name: string;
    description: string;
    rating: number;
    image_url: string;
  }

export interface SearchDataProp{
  onSearch: (query :string) => void;
}

export interface FoodDataProp{
  data: CardDatatype[]
}

export interface ToggleProps {
  handleDarkMode: () => void; 
  isDarkMode: boolean; 
}

export interface AddFormProps {
  filteredData: CardDatatype[];
  setFilteredData: React.Dispatch<React.SetStateAction<CardDatatype[]>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
